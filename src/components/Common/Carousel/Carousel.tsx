import React, { useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { makeStyles } from '@material-ui/core/styles'
import { VideoComponent } from '../Video'
import { ProjectAsset } from 'utils/Interface'
import ImagePreview from '../../../assets/imagePreview.png'
import { getAssets } from 'apis/assets'
import { CarouselButton } from './CarouselButton'

export type Props = {
  isVideo?: boolean
  assetIds: Array<string>
  isAssetLoading?: boolean | undefined
  accountId: string
}

export const AssetCarousel = ({ isVideo, assetIds, accountId }: Props) => {
  const classes = useStyles()

  const [currentIndex, setCurrentIndex] = useState(0)

  const [assets, setAssets] = useState<Array<ProjectAsset>>([])

  useEffect(() => {
    if (Array.isArray(assetIds) && assetIds) {
      loadAssets(assetIds)
    }
  }, [assetIds])

  const loadAssets = async (ids: Array<string>) => {
    const assets: Array<ProjectAsset> = await getAssets(ids, accountId)
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
    <div
      style={{
        display: 'flex',
        flex: 1
      }}>
      <CarouselButton
        direction={'left'}
        onClick={prev}
        inActive={currentIndex === 0}
      />

      <div className={classes.assetContainer}>
        <div style={{ position: 'relative', display: 'flex', flex: 1 }}>
          {assets.length === 0 ? (
            <div className={classes.assetOuter} style={{ minHeight: 300 }}>
              <div className={classes.assetInner}>
                <img
                  src={ImagePreview}
                  alt='default-asset'
                  className={classes.img}
                />
              </div>
            </div>
          ) : (
            assets.map((asset: ProjectAsset, index: number) => {
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
                      <VideoComponent url={file.url} />
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

      <CarouselButton
        direction={'right'}
        onClick={next}
        inActive={!assets.length || currentIndex === assets.length - 1}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  img: {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    minHeight: '100%',
    width: '100%',
    transform: 'translate(-50%, -50%)'
  },
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
    padding: `20px 30px`
  },
  assetOuter: {
    display: 'flex',
    flex: 1,
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: 600
    }),
    borderRadius: 10
  },
  assetInner: {
    flex: 1,
    position: 'relative',
    display: 'inline-block',
    overflow: 'hidden',
    margin: 0,
    borderRadius: 10
  }
}))