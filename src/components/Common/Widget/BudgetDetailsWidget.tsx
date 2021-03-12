import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Details } from '../../ProjectInfoDisplay/Details'
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
        label={'Production Budget:'}
        value={props.projectData?.campaignBudget || ''}
      />
      <Details
        label={'Production Expenses:'}
        value={props.projectData?.campaignExpenses || ''}
      />
      <Details
        label={'Estimated Net Revenue:'}
        value={
          props.projectData
            ? (
                props.projectData.campaignBudget -
                props.projectData.campaignExpenses
              ).toString()
            : ''
        }
      />
    </div>
  )
}
