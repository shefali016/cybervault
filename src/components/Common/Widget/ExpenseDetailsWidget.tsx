import React from 'react'
import { IconButton, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { renderDetails } from '../../ProjectInfoDisplay/renderDetails'
import iconMaterialEdit from '../../../assets/iconMaterialEdit.png'
import { AppDivider } from '../Core/AppDivider'

export const RenderExpenseDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={classes.clientDetailsContainer}
      style={{ color: props.editInfo ? 'white' : 'black' }}>
      <div className={classes.innerDiv}>
        <Typography variant={'h6'} className={classes.title}>
          Expense Details
        </Typography>
        {props.editInfo ? (
          <IconButton className={classes.button} onClick={props.onEdit}>
            <img
              src={iconMaterialEdit}
              alt='icon'
              className={classes.editIcon}
            />
          </IconButton>
        ) : null}
      </div>
      {props.projectData.expenses.map((item: any, index: number) => {
        return renderDetails(item.title, item.cost)
      })}
      <AppDivider />
    </div>
  )
}
