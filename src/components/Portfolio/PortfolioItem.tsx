import { Card, Typography } from '@material-ui/core'
import React from 'react'
import { Portfolio } from 'utils/Interface'
import { useStyles } from './style'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'

type Props = {
  portfolio: Portfolio
  onClick: (portfolio: Portfolio) => void
  responsiveWidth?: boolean
  style?: {}
  className?: string
}

export const PortfolioItem = ({
  portfolio,
  onClick,
  responsiveWidth = true,
  style,
  className
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Card
      key={portfolio.id}
      onClick={() => onClick(portfolio)}
      className={clsx(classes.portfoliosCard, 'card')}
      style={style}>
      <div className={classes.cardLogo}>
        {!!portfolio.icon && <img src={portfolio.icon} alt='' />}
      </div>

      <div className={'row stretch flex'}>
        <div className={`${classes.logoContent} flex`}>
          <Typography variant='body1' style={{ fontSize: 18 }}>
            {portfolio.name}
          </Typography>
          <Typography
            variant='caption'
            style={{ margin: 0, marginTop: 0, padding: 0 }}>
            {portfolio.description}
          </Typography>
        </div>
        <KeyboardArrowRightIcon style={{ color: theme.palette.text.meta }} />
      </div>
    </Card>
  )
}
