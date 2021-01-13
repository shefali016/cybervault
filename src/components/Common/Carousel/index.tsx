import React, { useState } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Button } from '@material-ui/core'
import arrowIcon from '../../../assets/Iconionic-ios-arrow-down.png'
import { makeStyles } from '@material-ui/core/styles'
import Dummy from '../../../assets/Dummy.jpg'
import { VideoComponent } from '../Video'

export const ImageCarousel = (props?: any) => {
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
        {[1, 2, 3].map((index: number) => {
          return props.isVideo ? (
            <div className={classes.videoComponentWrapper}>
              <VideoComponent
                url={'https://www.youtube.com/embed/0uGETVnkujA'}
              />
            </div>
          ) : (
            <div>
              <img src={Dummy} alt='' />
            </div>
          )
        })}
      </Carousel>
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
  }
}))
