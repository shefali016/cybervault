import React, { useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Button, IconButton } from '@material-ui/core'
import arrowIcon from '../../../assets/Iconionic-ios-arrow-down.png'
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
  onFeatureSelect
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  const [state, setState] = useState<State>({
    currentIndex: 0,
    renderTopAsset: true,
    topAsset: null,
    bottomAsset: null,
    assets: []
  })

  const { currentIndex, renderTopAsset, topAsset, bottomAsset, assets } = state

  useEffect(() => {
    loadAssets(assetIds)
  }, [assetIds])

  const loadAssets = async (ids: Array<string>) => {
    const assets: Array<ProjectAsset> = await getAssets(ids, accountId)
    const current = assets.findIndex((asset) => asset.id === featuredAsset)

    let assetState = {}
    const asset = assets[current]

    if (renderTopAsset) {
      assetState = { topAsset: asset }
    } else {
      assetState = { bottomAsset: asset }
    }

    setState({
      ...state,
      ...assetState,
      assets,
      currentIndex: current >= 0 ? current : 0
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
    const index = Math.min(currentIndex + 1, assets.length - 1)
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
              className={clsx(classes.img)}
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

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className={classes.assetContainer}>
        <div className={classes.currentSwitchContainer}>
          <CarouselButton
            onClick={prev}
            direction={'left'}
            inActive={currentIndex === 0}
          />

          <div className={classes.currentAssetContainer}>
            {!hasAsset && <img src={ImagePreview} alt='' />}
            {renderCurrentAsset({
              visible: true,
              asset: bottomAsset,
              style: { position: 'absolute' }
            })}
            {renderCurrentAsset({ visible: renderTopAsset, asset: topAsset })}
          </div>

          <CarouselButton
            onClick={next}
            direction={'right'}
            inActive={currentIndex === assets.length - 1}
          />
        </div>
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
                      className={classes.img}
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
                      isCurrent
                        ? (Math.floor(assets.length / 2) - index) * 30
                        : 0
                    }px)`,
                    opacity: isCurrent ? 0 : 1,
                    pointerEvents: isCurrent ? 'none' : 'auto'
                  }}
                  className={classes.assetPickerItemOuter}>
                  <div className={classes.assetPickerItemInner}>
                    <img
                      src={file.url}
                      alt={asset.fileName}
                      className={classes.img}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const currentAssetTransitionDuration = 650
const pickerTransitionDuration = 660

const useStyles = makeStyles((theme) => ({
  featureButton: { position: 'absolute', right: 0, top: 0 },
  featureIcon: { color: 'gold' },

  assetPickerContainer: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'center',
    height: 80,
    marginTop: theme.spacing(4)
  },
  assetPickerItemOuter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create(['transform', 'opacity', 'width'], {
      duration: pickerTransitionDuration
    }),
    background: '#000',
    borderRadius: 5,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    overflow: 'hidden'
  },
  assetPickerItemInner: {
    position: 'relative',
    width: 100,
    maxWidth: 100,
    height: 56,
    display: 'inline-block',
    overflow: 'hidden',
    margin: 0
  },

  img: {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    maxHeight: '100%',
    maxWidth: '100%',
    transform: 'translate(-50%, -50%)'
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
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  currentSwitchContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '23vw'
  },
  currentAssetContainer: {
    display: 'flex',
    maxWidth: '45vw',
    minWidth: '45vw',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  currentAssetOuter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: theme.transitions.create(['opacity'], {
      duration: currentAssetTransitionDuration
    }),
    background: '#000',
    borderRadius: 10,
    width: '40vw',
    maxWidth: '40vw',
    zIndex: 3000,
    overflow: 'hidden'
  },
  currentAssetInner: {
    position: 'relative',
    width: '40vw',
    maxWidth: '40vw',
    height: '22vw',
    display: 'inline-block',
    overflow: 'hidden',
    margin: 0
  }
}))
