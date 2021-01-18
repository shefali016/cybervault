import React, { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Button } from '@material-ui/core'
import arrowIcon from '../../../assets/Iconionic-ios-arrow-down.png'
import { makeStyles } from '@material-ui/core/styles'
import Dummy from '../../../assets/Dummy.jpg'
import { VideoComponent } from '../Video'
import { MediaObject } from 'utils/types'
import { WHITE_COLOR } from 'utils/constants/colorsConstants'

export type Props = {
  isVideo?: boolean
  source: Array<{}>
}

export const ImageCarousel = (props: Props) => {
  const classes = useStyles()
  const [currentSlide, setCurrentSlide] = useState(1)
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

  const renderEmptyComponent = () => {
    return <div />
  }

  const renderMediaComponent = () => {
    return props.source.map((data: MediaObject) => {
      return props.isVideo ? (
        <div className={classes.videoComponentWrapper}>
          <VideoComponent url={data.url} />
        </div>
      ) : (
        <div>
          <img src={data.url} alt='' />
        </div>
      )
    })
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
      <div className={classes.videoContainer}>
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
          {props.source.map((data: any) => {
            return props.isVideo ? (
              <div className={classes.videoComponentWrapper}>
                <VideoComponent url={data.url} />
              </div>
            ) : (
              <div style={{ height: 150, width: 370 }}>
                <img src={data.url} alt='' />
              </div>
            )
          })}
        </Carousel>
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
    width: '100%'
  },
  videoContainer: {
    margin: 0,
    width: '100%',
    borderWidth: 2,
    borderColor: WHITE_COLOR
  }
}))
