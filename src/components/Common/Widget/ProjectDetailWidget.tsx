import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import {
  renderDetails,
  renderDevider
} from '../../ProjectInfoDisplay/renderDetails'
import iconMaterialEdit from '../../../assets/iconMaterialEdit.png'
export const RenderProjectDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={classes.clientDetailsContainer}
      style={{ color: props.editInfo ? 'white' : 'black' }}>
      <div className={classes.innerDiv}>
        <Typography variant={'subtitle1'} className={classes.title}>
          Project Details:
        </Typography>
        {props.editInfo ? (
          <Button className={classes.button} onClick={props.onEdit}>
            <img
              src={iconMaterialEdit}
              alt='icon'
              className={classes.editIcon}
            />
          </Button>
        ) : null}
      </div>
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
