import React, { CSSProperties } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Button } from '@material-ui/core'
import arrowIcon from '../../../assets/Iconionic-ios-arrow-down.png'
import { makeStyles } from '@material-ui/core/styles'
import Dummy from '../../../assets/Dummy.jpg'
export const ImageCarousel = () => {
  const classes = useStyles()
  const arrowStyles: CSSProperties = {
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 30,
    height: 30,
    backgroundColor: 'transparent'
  }
  return (
    <Carousel
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <Button
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, left: -25 }}>
            <img
              src={arrowIcon}
              style={{ transform: 'rotate(180deg)', height: 25, width: 25 }}
            />
          </Button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <Button
            type='button'
            onClick={onClickHandler}
            title={label}
            style={{ ...arrowStyles, right: -25 }}>
            <img src={arrowIcon} style={{ height: 25, width: 25 }} />
          </Button>
        )
      }
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        return null
      }}>
      {
        //Used static data for testing
        [1, 2, 3].map((index: number) => {
          return (
            <div className={classes.carouselChild}>
              <img src={Dummy} alt='' />
            </div>
          )
        })
      }
    </Carousel>
  )
}

const useStyles = makeStyles((theme) => ({
  carouselChild: {
    width: 350,
    height: 150,
    marginLeft: 25
  }
}))
