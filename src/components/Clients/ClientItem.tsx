// Take array of clients, renders list of clients, returns client item component
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { getAllClientsRequest } from '../../actions/clientActions'
import { Card, Typography } from '@material-ui/core'
import { COLUMN, FLEX } from 'utils/constants/stringConstants'
import * as Types from '../../utils/Interface'
import clsx from 'clsx'
import { Client, Row } from 'utils/Interface'
import { useStyles } from 'components/Portfolio/style'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { useTheme } from '@material-ui/core/styles'
import { EditButton } from 'components/Common/Button/EditButton'
import ClientModal from 'components/Common/Modal/ClientModal'

type Props = {
  client: Client
  onClick?: (client: Client) => void
  responsiveWidth?: boolean
  style?: {}
  onEdit?: (client: Client) => void
}

export const ClientItem = ({
  client,
  onClick,
  responsiveWidth = true,
  style,
  onEdit
}: Props) => {
  const [editClientModalOpen, setEditClientModalOpen] = useState(false)
  const classes = useStyles()
  const theme = useTheme()

  const handleEditClient = () => {}

  const openEditClientModal = useCallback(
    () => setEditClientModalOpen(true),
    []
  )
  const closeEditClientModal = useCallback(
    () => setEditClientModalOpen(false),
    []
  )

  return (
    <Card
      key={client.id}
      className={clsx(classes.portfoliosCard)}
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
      />
    </Card>
  )
}

export default ClientItem
