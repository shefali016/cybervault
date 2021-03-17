import React, { useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { IconButton } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Asset } from 'utils/Interface'
import { getAssets } from 'apis/assets'
import Star from '@material-ui/icons/Star'
import StarOutline from '@material-ui/icons/StarOutline'
import clsx from 'clsx'
import { CarouselButton } from './CarouselButton'
import CloseIcon from '@material-ui/icons/Close'
import { AppIconButton } from '../Core/AppIconButton'

export type Props = {
  isVideo?: boolean
  assetIds: Array<string>
  featuredAsset?: string
  onFeatureSelect?: (id: string) => void
  isAssetLoading?: boolean | undefined
  accountId: string
  innerImageClassName?: string
  assetContainerMinHeight?: string | number
  onDeleteAsset?: (asset: Asset) => void
}

type State = {
  currentIndex: number
  renderTopAsset: boolean
  topAsset: Asset | null
  bottomAsset: Asset | null
  assets: Array<Asset>
}

export const FeatureAssetList = ({
  isVideo,
  assetIds,
  accountId,
  featuredAsset,
  onFeatureSelect,
  innerImageClassName,
  assetContainerMinHeight,
  onDeleteAsset
}: Props) => {
  const theme = useTheme()

  const [state, setState] = useState<State>({
    currentIndex: 0,
    renderTopAsset: true,
    topAsset: null,
    bottomAsset: null,
    assets: []
  })
  const classes = useStyles({ assetContainerMinHeight, assets: state.assets })

  const { currentIndex, renderTopAsset, topAsset, bottomAsset, assets } = state

  useEffect(() => {
    if (Array.isArray(assetIds) && assetIds) {
      loadAssets(assetIds)
    }
  }, [assetIds])

  const loadAssets = async (ids: Array<string>) => {
    const assets: Array<Asset> = await getAssets(ids, accountId)
    const featureIndex = assets.findIndex((asset) => asset.id === featuredAsset)
    const currentIndex = featureIndex >= 0 ? featureIndex : 0

    let assetState = {}
    const asset = assets[currentIndex]

    if (renderTopAsset) {
      assetState = { topAsset: asset }
    } else {
      assetState = { bottomAsset: asset }
    }

    setState({
      ...state,
      ...assetState,
      assets,
      currentIndex: currentIndex >= 0 ? currentIndex : 0
    })
  }

  const setAssetState = (index: number) => {
    if (index === currentIndex) return

    let assetState = {}
    const asset = assets[index]

    if (renderTopAsset) {
      assetState = { bottomAsset: asset }
    } else {
      assetState = { topAsset: asset }
    }

    setState({
      ...state,
      ...assetState,
      renderTopAsset: !renderTopAsset,
      currentIndex: index
    })
  }

  const next = () => {
    const index = Math.min(currentIndex + 1, Math.max(assets.length - 1, 0))
    setAssetState(index)
  }

  const prev = () => {
    const index = Math.max(currentIndex - 1, 0)
    setAssetState(index)
  }

  const handleAssetClick = (index: number) => {
    setAssetState(index)
  }

  const hasAsset: boolean = !!topAsset || !!bottomAsset
  const currentAsset: Asset | null = renderTopAsset ? topAsset : bottomAsset

  const renderCurrentAsset = ({
    visible,
    asset,
    style = {}
  }: {
    visible: boolean
    asset: Asset | null
    style?: {}
  }) => {
    if (!asset) {
      return null
    }

    return (
      <div
        className={classes.currentAssetOuter}
        style={{
          ...style,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none'
        }}>
        <div className={classes.currentAssetInner}>
          <div
            style={{
              position: 'relative',
              height: '100%',
              width: 'auto',
              objectFit: 'cover',
              borderRadius: 10
            }}>
            {!!asset && (
              <img
                src={asset.files[0].url}
                alt={asset.fileName}
                className={clsx(classes.img, innerImageClassName)}
              />
            )}
            {!!asset && typeof onFeatureSelect === 'function' && (
              <IconButton
                className={classes.featureButton}
                onClick={() => onFeatureSelect(asset.id)}>
                {asset.id === featuredAsset ? (
                  <Star className={classes.featureIcon} />
                ) : (
                  <StarOutline className={classes.featureIcon} />
                )}
              </IconButton>
            )}
            {typeof onDeleteAsset === 'function' && (
              <AppIconButton
                Icon={CloseIcon}
                onClick={(e: any) => {
                  e.stopPropagation()
                  onDeleteAsset(asset)
                }}
                className={'assetDeleteButton'}
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderAssetPicker = () => {
    if (!assets.length) {
      return null
    }
    return (
      <div className={classes.assetPickerInner}>
        {assets.map((asset, index) => {
          const file = asset.files[0]
          const isCurrent = index === currentIndex ? -200 : 0
          return (
            <div
              style={{ position: 'relative' }}
              key={`feature-asset-picker-${index}`}>
              <div
                onClick={() => handleAssetClick(index)}
                style={{
                  zIndex: 100 - index
                }}
                className={clsx(
                  classes.assetPickerItemOuter,
                  isCurrent ? classes.assetPickerItemPicked : {}
                )}>
                <img
                  src={file.url}
                  alt={asset.fileName}
                  className={classes.coverImage}
                />
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flex: 1
      }}>
      <div className={classes.assetContainer}>
        <div className={classes.currentSwitchContainer}>
          <CarouselButton
            onClick={prev}
            direction={'left'}
            inActive={currentIndex === 0}
            className={classes.largeSwitchButton}
          />

          <div className={classes.currentAssetContainer}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              }}>
              {!hasAsset && (
                <div className={classes.currentAssetOuter}>
                  <div className={classes.currentAssetInner}>
                    <div
                      className={clsx(
                        classes.coverImage,
                        classes.imgPlaceholder
                      )}
                    />
                  </div>
                </div>
              )}
              {renderCurrentAsset({
                visible: !renderTopAsset,
                asset: bottomAsset,
                style: {
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0
                }
              })}
              {renderCurrentAsset({ visible: renderTopAsset, asset: topAsset })}
            </div>
          </div>

          <CarouselButton
            onClick={next}
            direction={'right'}
            inActive={!assets.length || currentIndex === assets.length - 1}
            className={classes.largeSwitchButton}
          />
        </div>
        <div className={classes.smallSwitchContainer}>
          <CarouselButton
            onClick={prev}
            direction={'left'}
            inActive={currentIndex === 0}
            className={classes.smallSwitchButton}
          />
          <CarouselButton
            onClick={next}
            direction={'right'}
            inActive={!assets.length || currentIndex === assets.length - 1}
            className={classes.smallSwitchButton}
          />
        </div>
        <div className={classes.assetPickerContainer}>
          {renderAssetPicker()}
        </div>
      </div>
    </div>
  )
}

const currentAssetTransitionDuration = 650
const pickerTransitionDuration = 640

const pickerHeightLg = 18
const pickerHeightMd = 12
const pickerHeightSm = 8

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    position: 'absolute',
    top: '5%',
    right: '5%',
    background: '#00000050'
  },

  largeSwitchButton: { [theme.breakpoints.down('sm')]: { display: 'none' } },
  smallSwitchContainer: {
    display: 'inline-flex',
    gap: 10,
    paddingTop: theme.spacing(3)
  },
  smallSwitchButton: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      flex: 1
    },
    display: 'none'
  },

  imgPlaceholder: { background: theme.palette.background.surface },

  featureButton: {
    position: 'absolute',
    left: '3%',
    top: '5%',
    background: 'rgba(0,0,0,0.2)'
  },
  featureIcon: { color: 'gold' },

  assetPickerContainer: {
    position: 'relative',
    height: theme.spacing(pickerHeightLg),
    marginLeft: theme.spacing(11),
    [theme.breakpoints.down('md')]: {
      height: theme.spacing(pickerHeightMd),
      [theme.breakpoints.down('sm')]: {
        height: theme.spacing(pickerHeightSm),
        marginLeft: 0
      }
    },
    marginTop: theme.spacing(3)
  },
  assetPickerInner: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    overflowX: 'scroll',
    overflowY: 'auto'
  },
  assetPickerItemOuter: {
    position: 'relative',
    transition: theme.transitions.create(['transform', 'opacity', 'width'], {
      duration: pickerTransitionDuration
    }),
    background: 'rgba(0,0,0,0.1)',
    borderRadius: 15,
    marginLeft: theme.spacing(1.2),
    marginRight: theme.spacing(1.2),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(0.8),
      marginRight: theme.spacing(0.8)
    },
    overflow: 'hidden',
    minWidth: theme.spacing(pickerHeightLg),
    height: theme.spacing(pickerHeightLg),
    [theme.breakpoints.down('md')]: {
      minWidth: theme.spacing(pickerHeightMd),
      height: theme.spacing(pickerHeightMd),
      [theme.breakpoints.down('sm')]: {
        minWidth: theme.spacing(pickerHeightSm),
        height: theme.spacing(pickerHeightSm)
      }
    }
  },
  assetPickerItemPicked: {
    animation: `$isPicked 500ms ${theme.transitions.easing.easeOut}`,
    opacity: 0.2
  },
  '@keyframes isPicked': {
    '0%': {
      transform: 'scale(1)'
    },
    '50%': {
      transform: 'scale(0.9)'
    },
    '100%': {
      transform: 'scale(1)'
    }
  },
  coverImage: {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    minHeight: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 10,
    objectFit: 'cover'
  },
  img: {
    height: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
    borderRadius: 10
  },
  buttonImage: {
    height: 30,
    width: 30
  },
  button: {
    height: 30,
    width: 30
  },
  assetContainer: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
  },
  currentSwitchContainer: {
    flex: 1,
    display: 'flex'
  },
  currentAssetContainer: {
    position: 'relative',
    width: '100%',
    margin: `0 ${theme.spacing(6)}px`,
    paddingTop: '46.25%',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '56.25%',
      margin: 0
    }
  },
  currentAssetOuter: {
    height: '100%',
    display: 'flex',
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create(['opacity'], {
      duration: currentAssetTransitionDuration
    }),
    borderRadius: 10,
    overflow: 'hidden'
  },
  currentAssetInner: {
    flex: 1,
    alignSelf: 'stretch',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    margin: 0
  }
}))
