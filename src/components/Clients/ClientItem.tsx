import React from 'react'
import { Card, Typography } from '@material-ui/core'
import clsx from 'clsx'
import { Client } from 'utils/Interface'
import { useStyles } from 'components/Portfolio/style'
import { EditButton } from 'components/Common/Button/EditButton'

type Props = {
  client: Client
  onClick?: (client: Client) => void
  responsiveWidth?: boolean
  style?: {}
  onEdit?: (client: Client) => void
}

export const ClientItem = ({ client, style, onEdit }: Props) => {
  const classes = useStyles()

  return (
    <Card
      key={client.id}
      className={clsx('card', classes.portfoliosCard)}
      style={style}>
      <div className={classes.cardLogo}>
        {!!client.logo && <img src={client.logo} alt='' />}
      </div>

      <div className={classes.logoContent}>
        <Typography variant='body1' style={{ fontSize: 18 }}>
          {client.name}
        </Typography>
        <Typography
          variant='caption'
          style={{ margin: 0, marginTop: 0, padding: 0 }}>
          {client.email}
        </Typography>
      </div>

      <EditButton
        onClick={() => typeof onEdit === 'function' && onEdit(client)}
        className={' '}
      />
    </Card>
  )
}

export default ClientItem
