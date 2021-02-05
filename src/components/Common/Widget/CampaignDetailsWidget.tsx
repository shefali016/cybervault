import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { AppDivider } from '../Core/AppDivider'

export const RenderCampaignDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={classes.clientDetailsContainer}
      style={{
        color: props.isPortfolioScreen ? props.portfolioTestColor : 'black'
      }}>
      <div className={classes.innerDiv}>
        <Typography variant={'h6'} className={classes.title}>
          Campaign Description
        </Typography>
      </div>
      <Typography>
        {props.projectData ? props.projectData.description : ''}
      </Typography>
      <AppDivider />
    </div>
  )
}
