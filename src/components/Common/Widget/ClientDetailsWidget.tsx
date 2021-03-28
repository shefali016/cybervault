import React from 'react'
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
  hideInfo?: boolean
}

export const ClientDetails = ({
  clientData,
  editInfo,
  hideInfo,
  onEdit
}: Props) => {
  const classes = useStyles()

  if (!clientData) return null

  return (
    <div className={classes.clientDetailsContainer}>
      <div className={'row'} style={{ marginBottom: 20 }}>
        <AvatarTitle
          title={clientData.name}
          avatar={clientData.logo}
          className={classes.clientAvatarTitle}
        />
        {editInfo ? <EditButton onClick={onEdit} /> : null}
      </div>

      {!hideInfo && (
        <div className={classes.detailsContainer}>
          <Details label={'Email'} value={clientData.email} />
          <Details label={'Address'} value={clientData.address} />
          <Details label={'City'} value={clientData.city} />
          <Details label={'State'} value={clientData.state} />
          <Details label={'County'} value={clientData.country} />
        </div>
      )}

      <AppDivider />
    </div>
  )
}
