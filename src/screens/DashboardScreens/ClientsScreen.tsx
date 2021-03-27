import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  deleteProjectRequest,
  getAllProjectsRequest
} from '../../actions/projectActions'
import { getAllClientsRequest } from '../../actions/clientActions'
import { makeStyles } from '@material-ui/core/styles'
import * as Types from '../../utils/Interface'
import { Client, Account } from 'utils/Interface'
import AppTextField from 'components/Common/Core/AppTextField'
import { AppIconButton } from 'components/Common/Core/AppIconButton'
import AddIcon from '@material-ui/icons/Add'
import { PopoverHover } from 'components/Common/PopoverHover'
import ClientList from 'components/Clients/ClientList'
import ClientModal from 'components/Common/Modal/ClientModal'

type stateProps = {
  clients: Array<Client>
  account: Account
  client: Client
}

type Props = {
  tableContainerClassName?: string
  history: any
  accountId: string
  value: string
  onEdit?: (client: Client) => void
}

const ClientsScreen = ({
  clients,
  history,
  value,
  account,
  onEdit
}: Props & stateProps) => {
  const [addClientModalOpen, setAddClientModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentClient, setCurrentClient] = useState<Client | null | undefined>(
    null
  )
  const classes = useStyles()

  const handleCurrentClientChange = (client: Client) => {
    setCurrentClient(client)
  }

  const handleSearchTermChange = (event: any) => {
    setSearchTerm(event.target.value)
  }

  const filteredClients = useMemo(
    () =>
      clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [clients, searchTerm]
  )

  const handleAddClientModalShow = () => {
    openAddClientModal()
  }

  const openAddClientModal = useCallback(() => setAddClientModalOpen(true), [])
  const closeAddClientModal = useCallback(() => {
    setAddClientModalOpen(false)
    if (currentClient) {
      setTimeout(() => setCurrentClient(null), 150)
    }
  }, [currentClient])

  const handleEditClientModalShow = (client: Client) => {
    handleCurrentClientChange(client)
    openAddClientModal()
  }

  const renderHeader = () => {
    return (
      <div className={classes.sectionHeader}>
        <AppTextField
          darkStyle={true}
          onChange={handleSearchTermChange}
          value={value}
          style={{ maxWidth: 400 }}
          label={'Search for client'}
        />
        <div className={classes.sectionTitleContainer}></div>
        <PopoverHover label={'Add Client'}>
          <AppIconButton
            Icon={AddIcon}
            style={{ paddingRight: '1px' }}
            onClick={handleAddClientModalShow}
            iconClassName={classes.iconButton}
          />
        </PopoverHover>
      </div>
    )
  }

  return (
    <div className={'screenContainer'}>
      <div className={'screenInner'}>
        <div className={'responsivePadding'}>
          {renderHeader()}
          <ClientList
            clients={filteredClients}
            onEdit={handleEditClientModalShow}
          />
        </div>
      </div>

      <ClientModal
        open={addClientModalOpen}
        onRequestClose={closeAddClientModal}
        client={currentClient}
      />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  clients: state.clients.clientsData
})
const mapDispatchToProps = (dispatch: any) => ({
  getAllProjectsData: (account: Types.Account) => {
    return dispatch(getAllProjectsRequest(account))
  },
  getClientsRequest: (account: Types.Account) => {
    return dispatch(getAllClientsRequest(account))
  },
  deleteProject: (projectId: string) => {
    return dispatch(deleteProjectRequest(projectId))
  }
})

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    marginBottom: theme.spacing(1),
    color: theme.palette.text.background
  },
  background: {
    backgroundColor: '#24262B',
    height: '100%',
    width: '100%',
    overflowY: 'auto'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(1.5)
  },
  sectionTitleContainer: { flex: 1 },
  sectionInner: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'stretch'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    paddingTop: 0
  },
  iconButton: {
    height: 40,
    width: 40
  }
}))

export default connect(mapStateToProps)(ClientsScreen)
