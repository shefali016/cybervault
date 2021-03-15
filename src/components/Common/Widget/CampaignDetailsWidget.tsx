import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { AppDivider } from '../Core/AppDivider'
import clsx from 'clsx'

export const RenderCampaignDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={clsx(classes.clientDetailsContainer, props.className || '')}>
      <div className={classes.innerDiv}>
        <Typography variant={'h5'} className={classes.title}>
          Campaign Description
        </Typography>
      </div>
      <Typography>
        {props.projectData ? props.projectData.description : ''}
      </Typography>
      <AppDivider className={classes.bgNone} />
    </div>
  )
}
