import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import {
  renderDetails,
  renderDevider
} from '../../ProjectInfoDisplay/renderDetails'
import iconMaterialEdit from '../../../assets/iconMaterialEdit.png'

export const RenderBudgetDetails = (props: any) => {
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
