import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import {
  renderDetails,
  renderDevider
} from '../../ProjectInfoDisplay/renderDetails'

export const RenderExpenseDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={classes.clientDetailsContainer}
      style={{ color: props.editInfo ? 'white' : 'black' }}>
      <Typography variant={'body2'} style={{ marginBottom: 20 }}>
        Expense Details:
      </Typography>
      {props.projectData.expenses.map((item: any, index: number) => {
        return renderDetails(item.title, item.cost)
      })}
      {props.editInfo
        ? renderDevider({ editInfo: props.editInfo })
        : renderDevider()}
    </div>
  )
}
