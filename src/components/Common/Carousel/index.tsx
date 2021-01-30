import React, { useEffect, useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Button } from '@material-ui/core'
import arrowIcon from '../../../assets/Iconionic-ios-arrow-down.png'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { VideoComponent } from '../Video'
import { WHITE_COLOR } from 'utils/constants/colorsConstants'
import { ProjectAsset } from 'utils/Interface'
import ReactLoading from 'react-loading'
import { CENTER, FLEX } from 'utils/constants/stringConstants'
import ImagePreview from '../../../assets/imagePreview.png'
import { getAssets } from 'apis/assets'

export type Props = {
  isVideo?: boolean
  assetIds: Array<string>
  isAssetLoading?: boolean | undefined
  accountId: string
}

export const AssetCarousel = ({ isVideo, assetIds, accountId }: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  const [currentIndex, setCurrentIndex] = useState(0)

  const [assets, setAssets] = useState<Array<ProjectAsset>>([])

  useEffect(() => {
    loadAssets(assetIds)
  }, [assetIds])

  const loadAssets = async (ids: Array<string>) => {
    const assets: Array<ProjectAsset> = await getAssets(ids, accountId)
    setAssets(assets)
  }

  const next = () => {
    setCurrentIndex(Math.min(currentIndex + 1, assets.length - 1))
  }

  const prev = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0))
  }

  const handleAssetClick = (index: number) => {
    setCurrentIndex(index)
  }

  const getAssetTranslate = (position: number, offset: number) =>
    90 * position - 20 * position * position * 0.5 - offset

  const getAssetScale = (position: number) => {
    return 1 / (position / 4 + 1)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button className={classes.button}>
        <img
          src={arrowIcon}
          alt=''
          className={classes.buttonImage}
          style={{ transform: 'rotate(180deg)' }}
          onClick={prev}
        />
      </Button>
      <div className={classes.assetContainer}>
        {assets.length === 0
          ? [<img src={ImagePreview} alt='' />]
          : assets.map((data: ProjectAsset, index: number) => {
              const position = index - currentIndex
              const offset = (assets.length - 1) * 10
              return (
                <div
                  onClick={() => handleAssetClick(index)}
                  key={index}
                  style={{
                    width: 400,
                    maxWidth: 400,
                    zIndex: 1000 - index,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `translateX(${getAssetTranslate(
                      position,
                      offset
                    )}px) scale(${getAssetScale(position)})`,
                    background: '#e6e6e6',
                    opacity:
                      position >= 0 && position <= 3 ? 1 / (position + 1) : 0,
                    borderRadius: 5,
                    overflow: 'hidden',
                    position: 'absolute',
                    transition: theme.transitions.create([
                      'transform',
                      'opacity'
                    ]),
                    pointerEvents: position >= 0 ? 'auto' : 'none'
                  }}>
                  {isVideo ? (
                    <VideoComponent url={data.files[0].url} />
                  ) : (
                    <img src={data.files[0].url} alt='' width={400} />
                  )}
                </div>
              )
            })}
      </div>
      <Button className={classes.button}>
        <img
          src={arrowIcon}
          alt=''
          onClick={next}
          className={classes.buttonImage}
        />
      </Button>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 600,
    minWidth: 600,
    height: 400,
    position: 'relative'
  }
}))
