import React, { useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { makeStyles } from '@material-ui/core/styles'
import { VideoComponent } from '../Video'
import { Asset } from 'utils/Interface'
import { getAssets } from 'apis/assets'
import { CarouselButton } from './CarouselButton'
import clsx from 'clsx'
import { AppIconButton } from '../Core/AppIconButton'
import CloseIcon from '@material-ui/icons/Close'

export type Props = {
  isVideo?: boolean
  assetIds: Array<string>
  isAssetLoading?: boolean | undefined
  accountId: string
  onDeleteAsset?: (asset: Asset) => void
}

export const AssetCarousel = ({
  isVideo,
  assetIds,
  accountId,
  onDeleteAsset
}: Props) => {
  const classes = useStyles()

  const [currentIndex, setCurrentIndex] = useState(0)

  const [assets, setAssets] = useState<Array<Asset>>([])

  useEffect(() => {
    if (Array.isArray(assetIds) && assetIds) {
      loadAssets(assetIds)
    }
  }, [assetIds])

  const loadAssets = async (ids: Array<string>) => {
    const assets: Array<Asset> = await getAssets(ids, accountId)
    setAssets(assets)
  }

  const next = () => {
    setCurrentIndex(Math.min(currentIndex + 1, Math.max(assets.length - 1, 0)))
  }

  const prev = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0))
  }

  const handleAssetClick = (index: number) => {
    setCurrentIndex(index)
  }

  const getAssetScale = (position: number) => {
    return 1 / (position / 4 + 1)
  }

  return (
    <div className={classes.container}>
      <CarouselButton
        direction={'left'}
        onClick={prev}
        inActive={currentIndex === 0}
        className={classes.largeSwitchButton}
      />

      <div
        className={classes.assetContainer}
        style={
          assets && assets.length
            ? {
                marginRight: `${Math.min(3, assets.length - 1) * 1}%`
              }
            : {}
        }>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            alignItems: 'center'
          }}>
          {!(assets && assets.length) ? (
            <div className={classes.assetOuter}>
              <div className={classes.assetInner}>
                <div className={clsx(classes.img, classes.imgPlaceholder)} />
              </div>
            </div>
          ) : (
            assets.map((asset: Asset, index: number) => {
              const file = asset.files[0]
              const position = index - currentIndex
              return (
                <div
                  onClick={() => handleAssetClick(index)}
                  key={index.toString()}
                  className={classes.assetOuter}
                  style={{
                    position: index === 0 ? 'relative' : 'absolute',
                    zIndex: 1000 - index,
                    transform: `translateX(${
                      13 * position
                    }%) translateX(-${Math.max(
                      0,
                      4 * (position - 1)
                    )}%) scale(${getAssetScale(position)})`,
                    opacity:
                      position >= 0 && position <= 2 ? 1 / (position + 1) : 0,
                    background: isVideo ? 'transparent' : '#000',
                    pointerEvents: position >= 0 ? 'auto' : 'none'
                  }}>
                  <div
                    className={classes.assetInner}
                    style={{ pointerEvents: position === 0 ? 'auto' : 'none' }}>
                    {isVideo ? (
                      <VideoComponent
                        url={file.url}
                        onDelete={
                          typeof onDeleteAsset === 'function'
                            ? () => onDeleteAsset(asset)
                            : null
                        }
                      />
                    ) : (
                      <img
                        src={file.url}
                        alt={asset.fileName}
                        className={classes.img}
                      />
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      <div className={classes.smallSwitchContainer}>
        <CarouselButton
          direction={'left'}
          onClick={prev}
          inActive={currentIndex === 0}
          className={classes.smallSwitchButton}
        />
        <CarouselButton
          direction={'right'}
          onClick={next}
          inActive={!assets.length || currentIndex === assets.length - 1}
          className={classes.smallSwitchButton}
        />
      </div>

      <CarouselButton
        direction={'right'}
        onClick={next}
        inActive={!assets.length || currentIndex === assets.length - 1}
        className={classes.largeSwitchButton}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flex: 1,
    [theme.breakpoints.down('sm')]: { flexDirection: 'column' }
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
  img: {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    minHeight: '100%',
    width: '100%',
    transform: 'translate(-50%, -50%)'
  },
  imgPlaceholder: { background: theme.palette.background.surface },
  buttonImage: {
    fontSize: 50,
    color: theme.palette.grey[500],
    transition: theme.transitions.create(['color'], { duration: 500 })
  },
  inActiveButtonImage: { color: theme.palette.grey[800] },
  button: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    zIndex: 2000,
    flex: 1,
    height: '23vw',
    [theme.breakpoints.down('md')]: {
      height: '38vw'
    },
    '&:hover': {
      background: 'rgba(0,0,0,0.2)'
    },
    transition: theme.transitions.create(['background'])
  },
  assetContainer: {
    display: 'flex',
    position: 'relative',
    flex: 1,
    margin: `0 ${theme.spacing(6)}px`,
    [theme.breakpoints.down('sm')]: { margin: 0 }
  },
  assetOuter: {
    display: 'flex',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: 600
    }),
    borderRadius: 10,
    width: '100%',
    paddingTop: '56.25%'
  },
  assetInner: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    margin: 0,
    borderRadius: 10
  }
}))
