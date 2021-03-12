import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Details } from '../../ProjectInfoDisplay/Details'
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
        {props.editInfo && (
          <Button className={classes.button} onClick={props.onEdit}>
            <img
              src={iconMaterialEdit}
              alt='icon'
              className={classes.editIcon}
            />
          </Button>
        )}
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
