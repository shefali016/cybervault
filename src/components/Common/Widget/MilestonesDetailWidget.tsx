import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Details } from '../../ProjectInfoDisplay/Details'
import iconMaterialEdit from '../../../assets/iconMaterialEdit.png'
import { AppDivider } from '../Core/AppDivider'

export const RenderMilestonesDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={classes.clientDetailsContainer}
      style={{ color: props.editInfo ? 'white' : 'black' }}>
      <div className={classes.innerDiv}>
        <Typography variant={'h6'} className={classes.title}>
          Milestones Details
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
      {props.projectData.milestones.map((item: any, index: number) => {
        return <Details label={item.title} value={item.payment} />
      })}
      <AppDivider />
    </div>
  )
}
