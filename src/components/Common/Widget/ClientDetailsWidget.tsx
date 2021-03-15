import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from './styles'
import { Details } from '../../ProjectInfoDisplay/Details'
import { AppDivider } from '../Core/AppDivider'
import { EditButton } from '../Button/EditButton'
import { AvatarTitle } from 'components/AvatarTitle'
import { Client } from 'utils/Interface'

type Props = {
  clientData: Client | undefined
  editInfo?: boolean
  onEdit?: () => void
}

export const RenderClientDetails = ({
  clientData,
  editInfo,
  onEdit
}: Props) => {
  const classes = useStyles()

  if (!clientData) return null

  return (
    <div className={classes.clientDetailsContainer}>
      <div className={'row'}>
        <AvatarTitle
          title={clientData.name}
          avatar={clientData.logo}
          className={classes.clientAvatarTitle}
        />
        {editInfo ? <EditButton onClick={onEdit} /> : null}
      </div>
      <AppDivider />
    </div>
  )
}
