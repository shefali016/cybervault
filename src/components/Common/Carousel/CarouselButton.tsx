import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ArrowRight from '@material-ui/icons/ArrowRight'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import clsx from 'clsx'
import { ColorThemes } from 'utils/enums'

type Props = {
  direction: 'right' | 'left'
  onClick: () => void
  className?: string
  inActive?: boolean
}

export const CarouselButton = ({
  direction,
  onClick,
  className,
  inActive
}: Props) => {
  const classes = useStyles()

  const Arrow = useMemo(
    () => (direction === 'right' ? ArrowRight : ArrowLeft),
    [direction]
  )

  return (
    <div className={clsx(classes.button, className)} onClick={onClick}>
      <Arrow
        className={clsx(
          classes.buttonImage,
          inActive ? classes.inActiveButtonImage : ''
        )}
      />
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  buttonImage: {
    fontSize: 50,
    color: theme.palette.grey[300],
    transition: theme.transitions.create(['color'], { duration: 500 })
  },
  inActiveButtonImage: { color: theme.palette.grey[800] },
  button: {
    alignSelf: 'center',
    maxHeight: 300,
    cursor: 'pointer',
    background:
      theme.palette.colorTheme === ColorThemes.LIGHT
        ? 'rgba(0,0,0,0.08)'
        : 'rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    height: '100%',
    '&:hover': {
      background:
        theme.palette.colorTheme === ColorThemes.LIGHT
          ? 'rgba(0,0,0,0.18)'
          : 'rgba(0,0,0,0.3)'
    },
    transition: theme.transitions.create(['background'])
  }
}))
