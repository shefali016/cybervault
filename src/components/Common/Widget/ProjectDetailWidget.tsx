import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Details } from '../../ProjectInfoDisplay/Details'
import { AppDivider } from '../Core/AppDivider'
import { EditButton } from '../Button/EditButton'

export const RenderProjectDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div className={classes.clientDetailsContainer}>
      <div className={classes.innerDiv}>
        <Typography variant={'h5'} className={classes.title}>
          Project Details
        </Typography>
        {props.editInfo && <EditButton onClick={props.onEdit} />}
      </div>

      <Details
        label={'Campaign Objective:'}
        value={props.projectData?.campaignObjective}
      />
      <Details
        label={'Deadline:'}
        value={props.projectData?.campaignDeadLine}
      />
      <Details
        label={'Project Summary:'}
        value={props.projectData?.description}
      />

      {!props.hideBorder && <AppDivider />}
    </div>
  )
}
