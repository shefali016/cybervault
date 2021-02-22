import React, { useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { IconButton } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { ProjectAsset } from 'utils/Interface'
import ImagePreview from '../../../assets/imagePreview.png'
import { getAssets } from 'apis/assets'
import Star from '@material-ui/icons/Star'
import StarOutline from '@material-ui/icons/StarOutline'
import clsx from 'clsx'
import { CarouselButton } from './CarouselButton'

export type Props = {
  isVideo?: boolean
  assetIds: Array<string>
  featuredAsset?: string
  onFeatureSelect?: (id: string) => void
  isAssetLoading?: boolean | undefined
  accountId: string
  innerImageClassName?:string
  assetContainerMinHeight?:string|number
}

type State = {
  currentIndex: number
  renderTopAsset: boolean
  topAsset: ProjectAsset | null
  bottomAsset: ProjectAsset | null
  assets: Array<ProjectAsset>
}

export const FeatureAssetList = ({
  isVideo,
  assetIds,
  accountId,
  featuredAsset,
  onFeatureSelect,
  innerImageClassName,
  assetContainerMinHeight
}: Props) => {
  const theme = useTheme()
  
  const [state, setState] = useState<State>({
    currentIndex: 0,
    renderTopAsset: true,
    topAsset: null,
    bottomAsset: null,
    assets: []
  })
  const classes = useStyles({assetContainerMinHeight,assets:state.assets})

  const { currentIndex, renderTopAsset, topAsset, bottomAsset, assets } = state

  useEffect(() => {
    if (Array.isArray(assetIds) && assetIds) {
      loadAssets(assetIds)
    }
  }, [assetIds])

  const loadAssets = async (ids: Array<string>) => {
    const assets: Array<ProjectAsset> = await getAssets(ids, accountId)
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
  const currentAsset: ProjectAsset | null = renderTopAsset
    ? topAsset
    : bottomAsset

  const renderCurrentAsset = ({
    visible,
    asset,
    style = {}
  }: {
    visible: boolean
    asset: ProjectAsset | null
    style?: {}
  }) => {
    if (!currentAsset) {
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
          {!!asset && (
            <img
              src={asset.files[0].url}
              alt={asset.fileName}
              className={clsx(classes.img,innerImageClassName)}
            />
          )}
          {!!asset && (
            <IconButton
              className={classes.featureButton}
              onClick={() =>
                typeof onFeatureSelect === 'function' &&
                onFeatureSelect(asset.id)
              }>
              {asset.id === featuredAsset ? (
                <Star className={classes.featureIcon} />
              ) : (
                <StarOutline className={classes.featureIcon} />
              )}
            </IconButton>
          )}
        </div>
      </div>
    )
  }

  const renderAssetPicker = () => {
    if (!assets.length ) {
      return null
    }
    return (
      <div className={classes.assetPickerContainer}>
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
                  zIndex: 1000 - index,
                  opacity: isCurrent ? 0.2 : 1,
                  pointerEvents: isCurrent ? 'none' : 'auto'
                }}
                className={classes.assetPickerItemOuter}>
                <div className={classes.assetPickerItemInner}>
                  <img
                    src={file.url}
                    alt={asset.fileName}
                    className={classes.coverImage}
                  />
                </div>
              </div>
              <div
                onClick={() => handleAssetClick(index)}
                key={index}
                style={{
                  zIndex: 1000 - index,
                  position: 'absolute',
                  top: 0,
                  transform: `translateY(${
                    isCurrent ? -window.innerWidth * 0.15 : 0
                  }px) scale(${
                    isCurrent ? 4 * (window.innerWidth / 1300) : 1
                  }) translateX(${
                    isCurrent ? ((assets.length - 1) / 2 - index) * 20 : 0
                  }px)`,
                  opacity: isCurrent ? 0 : 1,
                  pointerEvents: isCurrent ? 'none' : 'auto'
                }}
                className={classes.assetPickerItemOuter}>
                <div className={classes.assetPickerItemInner}>
                  <img
                    src={file.url}
                    alt={asset.fileName}
                    className={classes.coverImage}
                  />
                </div>
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
          />

          <div className={classes.currentAssetContainer}>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                flexGrow: 1,
                alignSelf: 'stretch'
              }}>
              {!hasAsset && (
                <div className={classes.currentAssetOuter}>
                  <div className={classes.currentAssetInner}>
                    <img
                      src={ImagePreview}
                      alt='image-default'
                      className={classes.coverImage}
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
          />
        </div>
        {renderAssetPicker()}
      </div>
    </div>
  )
}

const currentAssetTransitionDuration = 650
const pickerTransitionDuration = 640

const useStyles = makeStyles((theme) => ({
  featureButton: {
    position: 'absolute',
    right: 70,
    top: 20,
    background: 'rgba(0,0,0,0.2)'
  },
  featureIcon: { color: 'gold' },

  assetPickerContainer: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    height: 80,
    marginTop: theme.spacing(3)
  },
  assetPickerItemOuter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create(['transform', 'opacity', 'width'], {
      duration: pickerTransitionDuration
    }),
    background: 'rgba(0,0,0,0.1)',
    borderRadius: 15,
    marginLeft: theme.spacing(1.2),
    marginRight: theme.spacing(1.2),
    overflow: 'hidden'
  },
  assetPickerItemInner: {
    position: 'relative',
    width: 60,
    height: 60,
    display: 'inline-block',
    overflow: 'hidden',
    margin: 0
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
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxHeight: '100%',
    maxWidth: '100%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 10
  },
  buttonImage: {
    height: 30,
    width: 30
  },
  button: {
    height: 30,
    width: 30,
    zIndex: 2000
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
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: (props:any)=>props.assetContainerMinHeight && props.assets.length?props.assetContainerMinHeight:300,
    padding: `20px 30px`
  },
  currentAssetOuter: {
    display: 'flex',
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create(['opacity'], {
      duration: currentAssetTransitionDuration
    }),
    borderRadius: 10,
    zIndex: 3000,
    overflow: 'hidden'
  },
  currentAssetInner: {
    flex: 1,
    alignSelf: 'stretch',
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    margin: 0
  }
}))
