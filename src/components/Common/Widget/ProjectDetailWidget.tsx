import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { renderDetails } from '../../ProjectInfoDisplay/renderDetails'
import iconMaterialEdit from '../../../assets/iconMaterialEdit.png'
import { AppDivider } from '../Core/AppDivider'

export const RenderProjectDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div className={classes.clientDetailsContainer}>
      <div className={classes.innerDiv}>
        <Typography variant={'h6'} className={classes.title}>
          Project Details
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
        props.projectData ? props.projectData.campaignObjective : ''
      )}

      {renderDetails(
        'Deadline: ',
        props.projectData ? props.projectData.campaignDeadLine : ''
      )}

      {props.projectData &&
        props.projectData.description &&
        renderDetails(
          'Project Summary: ',
          props.projectData ? props.projectData.description : ''
        )}

      <AppDivider />
    </div>
  )
}
