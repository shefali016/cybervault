import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  deleteProjectRequest,
  getAllProjectsRequest
} from '../../actions/projectActions'
import { getAllClientsRequest } from '../../actions/clientActions'
import { Typography } from '@material-ui/core'
import { ProjectCard } from '../../components/Cards/ProjectCard'
import UnpaidInvoices from '../../components/Cards/UnpaidInvoices'
import PendingInvoices from '../../components/Cards/PendingInvoices'
import IncomeThisMonth from '../../components/Cards/IncomeThisMonth'
import ProjectCount from '../../components/Cards/ProjectCount'
import ProfitsExpenses from '../../components/Cards/ProfitsExpenses'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { COLUMN } from 'utils/constants/stringConstants'
import Widget from '../../components/Common/Widget'
import { getWidgetCardHeight } from '../../utils'
import * as Types from '../../utils/Interface'
import clsx from 'clsx'

const UNPAID_INVOICES_DATA = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

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
        style={{ height: '70vw', maxHeight: 280 }}
        renderItem={(item) => (
          <ProjectCard
            clients={props.clients}
            customerEmail={props.customerEmail}
            project={item}
            isPopover={true}
            key={`project-card-${item.id}`}
            style={{
              paddingRight: theme.spacing(3)
            }}
            history={props.history}
            account={props.userData.account}
            userInfo={props.userData.user}
            onDelete={props.deleteProject}
            deletingId={props.deletingProjectId}
          />
        )}
      />

      <div className={'widgetOuter'}>
        <Typography
          variant={'h6'}
          className={clsx('widgetTitle', 'responsiveHorizontalPadding')}>
          Invoicing and Analytics
        </Typography>
        <div
          className={clsx(
            'widgetResponsiveInner',
            'responsiveHorizontalPadding'
          )}>
          <PendingInvoices />
          <ProfitsExpenses />
          <ProjectCount projectCount={allProjects.length} />
          <IncomeThisMonth />
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
  customerEmail: state.auth.user.email,
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
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'nowrap',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
    paddingTop: 15,
    paddingBottom: 15,
    [theme.breakpoints.down('sm')]: {
      flexDirection: COLUMN,
      alignItems: 'stretch'
    }
  }
}))

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
