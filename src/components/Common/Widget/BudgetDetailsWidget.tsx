import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import {
  renderDetails,
  renderDevider
} from '../../ProjectInfoDisplay/renderDetails'

export const RenderBudgetDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={classes.clientDetailsContainer}
      style={{ color: props.editInfo ? 'white' : 'black' }}>
      <Typography variant={'body2'} style={{ marginBottom: 20 }}>
        Project Details:
      </Typography>
      {renderDetails('Production Budget:', props.projectData.campaignBudget)}
      {renderDetails(
        'Production Expenses: ',
        props.projectData.campaignExpenses
      )}
      {props.editInfo
        ? renderDevider({ editInfo: props.editInfo })
        : renderDevider()}
      <Typography variant={'subtitle2'} style={{ marginTop: 10 }}>
        Estimated Net Revenue: ${' '}
        {props.projectData.campaignBudget - props.projectData.campaignExpenses}
      </Typography>
    </div>
  )
}
