import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import {
  renderDetails,
  renderDevider
} from '../../ProjectInfoDisplay/renderDetails'
import iconMaterialEdit from '../../../assets/iconMaterialEdit.png'

export const RenderTaskDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={classes.clientDetailsContainer}
      style={{ color: props.editInfo ? 'white' : 'black' }}>
      <div className={classes.innerDiv}>
        <Typography variant={'subtitle1'} className={classes.title}>
          Tasks Details:
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
      {props.projectData.tasks.map((item: any, index: number) => {
        return renderDetails(item.title, item.startDate, item.endDate)
      })}

      {props.editInfo
        ? renderDevider({ editInfo: props.editInfo })
        : renderDevider()}
    </div>
  )
}
