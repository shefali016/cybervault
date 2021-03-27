import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { connect } from 'react-redux'
import {
  deleteProjectRequest,
  getAllProjectsRequest
} from '../../actions/projectActions'
import { getAllClientsRequest } from '../../actions/clientActions'
import { Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { COLUMN, FLEX } from 'utils/constants/stringConstants'
import * as Types from '../../utils/Interface'
import clsx from 'clsx'
import { Client, Row, Account } from 'utils/Interface'
import { AppTable } from 'components/Common/Core/AppTable'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Section from 'components/Common/Section'
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
  const theme = useTheme()

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

  const onClick = () => {}

  const goToClient = (client: Client) => {
    history.push(`/client/${client.id}`)
  }

  const handleAddClientModalShow = () => {
    openAddClientModal()
  }

  const openAddClientModal = useCallback(() => setAddClientModalOpen(true), [])
  const closeAddClientModal = useCallback(
    () => [setAddClientModalOpen(false), setCurrentClient(null)],
    []
  )

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
        <PopoverHover className={classes.temp} label={'Add Client'}>
          <AppIconButton
            Icon={AddIcon}
            className={classes.iconContainer}
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
        <div className={'responsivePadding'}>{renderHeader()}</div>

        <div className={'screenInner'}>
          <ClientList
            clients={filteredClients}
            onClick={goToClient}
            onEdit={handleEditClientModalShow}
            className='responsivePadding'
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
  invoicingWrapper: {
    flexWrap: 'nowrap',
    overflowX: 'auto',
    whiteSpace: 'nowrap'
  },
  middleCardsWrapper: {
    display: FLEX,
    [theme.breakpoints.down('sm')]: {
      flexDirection: COLUMN
    }
  },
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
  widgetItem: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3)
    }
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center'
    // paddingLeft: theme.spacing(1.5)
  },
  sectionTitleContainer: { flex: 1 },
  projectCardsUl: {
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    listStyle: 'none'
  },
  projectCardsli: {
    float: 'left',
    margin: '0 0 20px 0',
    width: '25%'
  },
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
  },
  iconContainer: {},
  temp: {}
}))

export default connect(mapStateToProps)(ClientsScreen)
