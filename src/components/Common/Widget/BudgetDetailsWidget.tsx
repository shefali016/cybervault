import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { renderDetails } from '../../ProjectInfoDisplay/renderDetails'
import iconMaterialEdit from '../../../assets/iconMaterialEdit.png'

export const RenderBudgetDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={classes.clientDetailsContainer}
      style={{ color: props.editInfo ? 'white' : 'black' }}>
      <div className={classes.innerDiv}>
        <Typography variant={'h6'} className={classes.title}>
          Budget & Expenses
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
        'Production Budget:',
        `$${props.projectData ? props.projectData.campaignBudget : ''}`
      )}
      {renderDetails(
        'Production Expenses: ',
        `$${props.projectData ? props.projectData.campaignExpenses : ''}`
      )}
      {renderDetails(
        'Estimated Net Revenue: ',
        `$${
          props.projectData
            ? props.projectData.campaignBudget -
              props.projectData.campaignExpenses
            : 0
        }`
      )}
    </div>
  )
}
