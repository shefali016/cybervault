import React, { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Button } from '@material-ui/core'
import arrowIcon from '../../../assets/Iconionic-ios-arrow-down.png'
import { makeStyles } from '@material-ui/core/styles'
import { VideoComponent } from '../Video'
import { WHITE_COLOR } from 'utils/constants/colorsConstants'
import { ProjectAsset } from 'utils/Interface'
import ReactLoading from 'react-loading'
import { CENTER, FLEX } from 'utils/constants/stringConstants'

export type Props = {
  isVideo?: boolean
  source: Array<ProjectAsset>
  isAssetLoading?: boolean | undefined
}

export const ImageCarousel = (props: Props) => {
  const classes = useStyles()
  const [currentSlide, setCurrentSlide] = useState(0)
  const next = () => {
    setCurrentSlide(currentSlide + 1)
  }

  const prev = () => {
    setCurrentSlide(currentSlide - 1)
  }

  const updateCurrentSlide = (index: number) => {
    if (currentSlide !== index) {
      setCurrentSlide(index)
    }
  }

  return (
    <div style={{ display: 'flex' }}>
      <Button
        className={classes.button}
        style={{ marginTop: props.isVideo ? 110 : 80 }}>
        <img
          src={arrowIcon}
          alt=''
          className={classes.buttonImage}
          style={{ transform: 'rotate(180deg)' }}
          onClick={prev}
        />
      </Button>
      <div
        className={
          props.source && props.source.length ? classes.videoContainer : ''
        }>
        {
          <Carousel
            statusFormatter={(currentItem: number, total: number) => {
              return ''
            }}
            renderArrowPrev={(onClickHandler, hasPrev, label) => {
              return null
            }}
            renderArrowNext={(onClickHandler, hasNext, label) => {
              return null
            }}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
              return null
            }}
            selectedItem={currentSlide}
            onChange={updateCurrentSlide}>
            {props.source.map((data: any, i: number) => {
              return props.isVideo ? (
                <div key={i} className={classes.videoComponentWrapper}>
                  {props.isAssetLoading ? (
                    <ReactLoading
                      type={'bubbles'}
                      color={'#fff'}
                      className={classes.loader}
                    />
                  ) : data.isPlaceHolder ? (
                    <img src={data.files[0].url} alt='' />
                  ) : (
                    <VideoComponent url={data.files[0].url} />
                  )}
                </div>
              ) : (
                <div key={i} style={{ width: 400, maxWidth: 400 }}>
                  {props.isAssetLoading ? (
                    <ReactLoading
                      type={'bubbles'}
                      color={'#fff'}
                      className={classes.loader}
                    />
                  ) : (
                    <img
                      src={
                        data.files && data.files.length
                          ? data.files[0].url
                          : null
                      }
                      alt=''
                    />
                  )}
                </div>
              )
            })}
          </Carousel>
        }
      </div>
      <Button
        className={classes.button}
        style={{ marginTop: props.isVideo ? 110 : 80 }}>
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
    width: 30
  },
  videoComponentWrapper: {
    margin: 0,
    width: 400,
    maxWidth: 400
  },
  videoContainer: {
    margin: 0,
    width: '100%',
    borderWidth: 2,
    borderColor: WHITE_COLOR
  },
  loaderWrapper: {
    zIndex: 1000,
    position: 'absolute',
    right: '0px',
    bottom: '0px',
    height: '100%',
    width: '100%',
    display: FLEX,
    alignItems: CENTER,
    justifyContent: CENTER
  },
  loader: {
    height: '200px !important',
    width: '100px !important',
    margin: '0 auto'
  }
}))
