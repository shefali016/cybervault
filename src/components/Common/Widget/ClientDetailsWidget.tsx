import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import {
  renderDetails,
  renderDevider
} from '../../ProjectInfoDisplay/renderDetails'

export const RenderClientDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={classes.clientDetailsContainer}
      style={{ color: props.editInfo ? 'white' : 'black' }}>
      <Typography variant={'body2'} style={{ marginBottom: 20 }}>
        Client Details:
      </Typography>
      {renderDetails('Client Name:', props.projectData.clientName)}
      {renderDetails('Client Contact: ', props.projectData.clientEmail)}
      {props.editInfo
        ? renderDevider({ editInfo: props.editInfo })
        : renderDevider()}
    </div>
  )
}
