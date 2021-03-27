import React from 'react'
import { Client } from 'utils/Interface'
import ClientItem from 'components/Clients/ClientItem'
import { EmptyIcon } from 'components/EmptyIcon'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

type Props = {
  clients: Array<Client>
  onEdit?: (client: Client) => void
  className?: string
  onClick?: (client: Client) => void
}

export const ClientList = ({ clients, onEdit, className }: Props) => {
  return (
    <div className={className}>
      {clients.length == 0 && (
        <EmptyIcon Icon={AccountBoxIcon} title={'No clients found'} />
      )}
      <div className={'listStyle'}>
        {clients.map((client: Client) => (
          <ClientItem client={client} onEdit={onEdit} />
        ))}
      </div>
    </div>
  )
}

export default ClientList
