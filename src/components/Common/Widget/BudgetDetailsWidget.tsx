import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Details } from '../../ProjectInfoDisplay/Details'
import { EditButton } from '../Button/EditButton'
import clsx from 'clsx'

export const RenderBudgetDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div className={classes.clientDetailsContainer}>
      <div className={classes.innerDiv}>
        <Typography
          variant={'h5'}
          className={clsx(classes.title, props.headerClassName)}>
          Budget & Expenses
        </Typography>
        {props.editInfo ? <EditButton onClick={props.onEdit} /> : null}
      </div>
      <div className={classes.detailsContainer}>
        <Details
          label={'Production Budget:'}
          value={'$' + props.projectData?.campaignBudget || ''}
        />
        <Details
          label={'Production Expenses:'}
          value={'$' + props.projectData?.campaignExpenses || ''}
        />
        <Details
          label={'Estimated Net Revenue:'}
          value={
            '$' +
            (props.projectData
              ? (
                  props.projectData.campaignBudget -
                  props.projectData.campaignExpenses
                ).toString()
              : '')
          }
        />
      </div>
    </div>
  )
}
