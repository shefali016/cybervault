import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import {
  renderDetails,
  renderDevider
} from '../../ProjectInfoDisplay/renderDetails'

export const RenderProjectDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={classes.clientDetailsContainer}
      style={{ color: props.editInfo ? 'white' : 'black' }}>
      <Typography variant={'body2'} style={{ marginBottom: 20 }}>
        Project Details:
      </Typography>
      {renderDetails(
        'Campaign Objective:',
        props.projectData.campaignObjective
      )}
      {renderDetails('Deadline: ', props.projectData.campaignDeadLine)}
      {renderDetails('Project Summary: ', props.projectData.description)}
      {props.editInfo
        ? renderDevider({ editInfo: props.editInfo })
        : renderDevider()}
    </div>
  )
}
