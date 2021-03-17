import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Details } from '../../ProjectInfoDisplay/Details'
import iconMaterialEdit from '../../../assets/iconMaterialEdit.png'
import { AppDivider } from '../Core/AppDivider'

export const RenderClientDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div
      className={classes.clientDetailsContainer}
      style={{ color: props.editInfo ? 'white' : 'black' }}>
      <div className={classes.innerDiv}>
        <Typography variant={'h6'} className={classes.title}>
          Client Details
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

      <Details label={'Client Name:'} value={props.clientData?.name} />
      <Details label={'Client Contact:'} value={props.clientData?.email} />

      <AppDivider />
    </div>
  )
}
