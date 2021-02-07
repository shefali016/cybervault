import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllProjectsRequest } from '../../actions/projectActions'
import { getClientsRequest } from '../../actions/clientActions'
import { Typography } from '@material-ui/core'
import ProjectCard from '../../components/Cards/ProjectDescriptionCard'
import UnpaidInvoices from '../../components/Cards/UnpaidInvoices'
import PendingInvoices from '../../components/Cards/PendingInvoices'
import IncomeThisMonth from '../../components/Cards/IncomeThisMonth'
import ProjectCount from '../../components/Cards/ProjectCount'
import ProfitsExpenses from '../../components/Cards/ProfitsExpenses'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { COLUMN, FLEX } from 'utils/constants/stringConstants'
import Widget from '../../components/Common/Widget'
import { getWidgetCardHeight } from '../../utils'
import * as Types from '../../utils/Interface'

const UNPAID_INVOICES_DATA = [1, 2, 3, 4]

const HomeScreen = (props: any) => {
  const [allProjects, setAllProjects] = useState([])

  useEffect(() => {
    if (props.allProjectsData && props.allProjectsData !== allProjects) {
      setAllProjects(props.allProjectsData)
    }
  }, [
    props.isLoggedIn,
    props.newProjectData,
    props.allProjectsData,
    props,
    allProjects
  ])

  useEffect(() => {
    props.getClientsRequest(props.userData.account)
    props.getAllProjectsData(props.userData.account)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const classes = useStyles()
  const theme = useTheme()

  return (
    <div>
      <Widget
        data={allProjects}
        title={'Active Projects'}
        emptyMessage={'No Active Projects'}
        loading={props.activeProjectsLoading}
        itemHeight={getWidgetCardHeight(theme)}
        renderItem={(item) => (
          <ul className={classes.projectCardsUl}>
            <li className={classes.projectCardsli}>
              <ProjectCard
                clients={props.clients}
                project={item}
                isPopover={true}
                key={`project-card-${item.projectId}`}
                style={{
                  paddingRight: theme.spacing(3)
                }}
                history={props.history}
              />
            </li>
          </ul>
        )}
      />
      <div className={classes.invoicingWrapper}>
        <Typography variant={'body1'} className={classes.sectionTitle}>
          Invoicing and Analytics
        </Typography>
        <div className={classes.middleCardsWrapper}>
          <PendingInvoices className={classes.widgetItem} />
          <ProfitsExpenses className={classes.widgetItem} />
          <ProjectCount
            className={classes.widgetItem}
            projectCount={allProjects.length}
          />
          <IncomeThisMonth style={{ paddingRight: theme.spacing(3) }} />
        </div>
      </div>
      <Widget
        title={'Unpaid Invoices'}
        data={UNPAID_INVOICES_DATA}
        renderItem={(item) => (
          <UnpaidInvoices
            projectDetails={item}
            key={`unpaid-invoices-${item.id}`}
            style={{ paddingRight: theme.spacing(3) }}
          />
        )}
        emptyMessage={'No Projects found'}
      />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  newProjectData: state.project.newProjectData,
  allProjectsData: state.project.allProjectsData,
  activeProjectsLoading: state.project.isLoading,
  userData: state.auth,
  clients:state.clients.clientsData
})
const mapDispatchToProps = (dispatch: any) => ({
  getAllProjectsData: (account: Account) => {
    return dispatch(getAllProjectsRequest(account))
  },
  getClientsRequest: (account:Types.Account) => {
    return dispatch(getClientsRequest(account))
  }
})

const useStyles = makeStyles((theme) => ({
  invoicingWrapper: {
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
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
  }
}))

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
