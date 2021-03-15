import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Details } from '../../ProjectInfoDisplay/Details'
import { AppDivider } from '../Core/AppDivider'
import { EditButton } from '../Button/EditButton'

export const RenderExpenseDetails = (props: any) => {
  const classes = useStyles()

  const renderExpenses = () => {
    if (!props.projectData.expenses.length) {
      return (
        <Typography variant='body1' className={'metaText'}>
          This project has no expenses
        </Typography>
      )
    }
    return props.projectData.expenses.map((item: any, index: number) => {
      return <Details key={item.title} label={item.title} value={item.cost} />
    })
  }

  return (
    <div className={classes.clientDetailsContainer}>
      <div className={classes.innerDiv}>
        <Typography variant={'h5'} className={classes.title}>
          Expense Details
        </Typography>
        {props.editInfo ? <EditButton onClick={props.onEdit} /> : null}
      </div>
      {renderExpenses()}
      <AppDivider />
    </div>
  )
}
