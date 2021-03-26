import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Typography, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Modal from './index'
import AppTextField from '../Core/AppTextField'
import clsx from 'clsx'
import AddClient from 'components/Client/AddClient'
import { Client, Account } from 'utils/Interface'
import AppModal from 'components/Common/Modal'
import { ReduxState } from 'reducers/rootReducer'
import CloseButton from '../../Common/Button/CloseButton'
import { logoutSuccess } from 'actions/authActions'

type StateProps = {
  account: Account
  clients: Array<Client>
  success: Client | null
}

type Props = {
  open: boolean
  onRequestClose: () => void
  client?: Client | null | undefined
}

const onBack = () => {}

const ClientModal = ({
  account,
  clients,
  open,
  onRequestClose,
  client,
  success
}: Props & StateProps) => {
  useEffect(() => {
    if (success) {
      onRequestClose()
    }
  }, [success])

  return (
    <AppModal open={open} onRequestClose={onRequestClose}>
      <div className={'modalContent'}>
        <CloseButton
          onClick={onRequestClose}
          style={{
            position: 'absolute',
            top: 10,
            right: 10
          }}
        />
        <AddClient
          isEdit={!!client}
          account={account}
          showBackButton={false}
          client={client}
        />
      </div>
    </AppModal>
  )
}

const mapState = (state: ReduxState): StateProps => ({
  success: state.clients.newClientSuccess,
  account: state.auth.account as Account,
  clients: state.clients.clientsData as Array<Client>
})

export default connect(mapState)(ClientModal)
