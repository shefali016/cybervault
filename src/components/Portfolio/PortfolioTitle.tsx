import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
import React from 'react'
import { Portfolio } from 'utils/Interface'

type Props = {
  portfolio: Portfolio | null | undefined
  size?: number
  className?: string
}

export const PortfolioTitle = ({ portfolio, size = 35, className }: Props) => {
  const theme = useTheme()
  const classes = useStyles()

  if (!portfolio) {
    return null
  }

  return (
    <div className={clsx('row', className)}>
      <div
        className='circleImage'
        style={{
          height: size,
          minWidth: size,
          borderRadius: size / 2,
          marginRight: theme.spacing(1.5)
        }}>
        {!!portfolio.icon && <img src={portfolio.icon} alt='portfolio-icon' />}
      </div>
      <Typography variant='h5' color='inherit' className={classes.title}>
        {portfolio.name}
      </Typography>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  title: { [theme.breakpoints.down('sm')]: { fontSize: 20 } }
}))
