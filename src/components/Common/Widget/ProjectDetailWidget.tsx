import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { renderDetails } from '../../ProjectInfoDisplay/renderDetails'
import iconMaterialEdit from '../../../assets/iconMaterialEdit.png'
import { AppDivider } from '../Core/AppDivider'

export const RenderProjectDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={classes.clientDetailsContainer}
      style={{
        color:
          props.editInfo || props.isPortfolioScreen
            ? props.portfolioTestColor
              ? props.portfolioTestColor
              : 'white'
            : 'black'
      }}>
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
      {!props.isPortfolioScreen
        ? renderDetails(
            'Deadline: ',
            props.projectData ? props.projectData.campaignDeadLine : ''
          )
        : null}
      {props.projectData &&
        props.projectData.description &&
        renderDetails(
          'Project Summary: ',
          props.projectData ? props.projectData.description : ''
        )}
      <AppDivider className={!props.isPortfolioScreen ? '' : classes.bgNone} />
    </div>
  )
}
