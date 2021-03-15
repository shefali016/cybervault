import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { AppDivider } from '../Core/AppDivider'
import clsx from 'clsx'

export const RenderCampaignDetails = (props: any) => {
  const classes = useStyles()

  if (!(props.projectData && props.projectData.description)) {
    return null
  }

  return (
    <div
      className={clsx(classes.clientDetailsContainer, props.className || '')}>
      <div className={classes.innerDiv}>
        <Typography
          variant={'h5'}
          className={clsx(classes.title, props.titleClassName)}>
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
