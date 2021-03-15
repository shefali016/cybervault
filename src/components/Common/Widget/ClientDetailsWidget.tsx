import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Details } from '../../ProjectInfoDisplay/Details'
import { AppDivider } from '../Core/AppDivider'
import { EditButton } from '../Button/EditButton'

export const RenderClientDetails = (props: any) => {
  const classes = useStyles()
  return (
    <div className={classes.clientDetailsContainer}>
      <div className={classes.innerDiv}>
        <Typography variant={'h5'} className={classes.title}>
          Client Details
        </Typography>
        {props.editInfo ? <EditButton onClick={props.onEdit} /> : null}
      </div>

      <Details label={'Client Name:'} value={props.clientData?.name} />
      <Details label={'Client Contact:'} value={props.clientData?.email} />

      <AppDivider />
    </div>
  )
}
