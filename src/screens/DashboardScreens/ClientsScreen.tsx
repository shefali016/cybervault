import React, { useEffect, useState, useMemo } from 'react'
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
import { Client, Row } from 'utils/Interface'
import { AppTable } from 'components/Common/Core/AppTable'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Section from 'components/Common/Section'

type Props = {
  clients: Array<Client>
  tableContainerClassName?: string
  history: any
  accountId: string
}

const ClientsScreen = ({
  clients,
  tableContainerClassName,
  history,
  accountId
}: Props) => {
  const [allProjects, setAllProjects] = useState([])
  const classes = useStyles()
  const theme = useTheme()

  const headerCells = [
    { title: 'Client Name', key: 'name' },
    { title: 'Email', key: 'email' }
    // { title: 'Company', key: 'company'}
  ]

  const rows = useMemo(() => {
    let rows: Array<Row> = []

    return rows
  }, [])

  const handleRowClick = (data: string) => {
    // TO DO - Open Modal
  }

  const renderHeader = () => {
    return (
      <div className={classes.sectionHeader}>
        <div className={classes.sectionTitleContainer}></div>
      </div>
    )
  }

  return (
    <div className={'screenContainer'}>
      <Section className={classes.section}>
        <div className={classes.sectionInner}>{renderHeader()}</div>
      </Section>
      <div className={'screenInner'}>
        <div className={'responsivePadding'}>
          <div className={'screenChild'}>
            <AppTable
              rows={rows}
              headerCells={headerCells}
              tableContainerClassName={'table'}
              emptyProps={{ Icon: AccountBoxIcon, title: 'No Clients' }}
              handleRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  newProjectData: state.project.newProjectData,
  allProjectsData: state.project.allProjectsData,
  activeProjectsLoading: state.project.isLoading,
  userData: state.auth,
  clients: state.clients.clientsData,
  deletingProjectId: state.project.deletingId
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
    alignItems: 'center',
    paddingLeft: theme.spacing(1.5)
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
  }
}))

export default ClientsScreen
