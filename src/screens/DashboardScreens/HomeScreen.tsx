import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { deleteProjectRequest, getProjects } from '../../actions/projectActions'
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
import { EmptyIcon } from 'components/EmptyIcon'
import ProjectIcon from '@material-ui/icons/Collections'
import { GetProjectParams } from 'utils/Interface/api'
import { activeProjects } from 'utils/selectors'
import { ProjectFilters, ProjectStatuses } from 'utils/enums'
import InvoiceIcon from '@material-ui/icons/Receipt'

const UNPAID_INVOICES_DATA = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

type Props = { projects: Array<Types.Project> }

const HomeScreen = (props: any) => {
  useEffect(() => {
    props.getClientsRequest(props.userData.account)
    props.getProjects(
      {
        where: ['status', '==', ProjectStatuses.PROGRESS],
        orderBy: 'updatedAt'
      },
      ProjectFilters.ACTIVE
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className='screenContainer'>
      <div className={'screenInner'}>
        <Widget
          data={props.projects}
          title={'Active Projects'}
          EmptyComponent={
            <EmptyIcon
              title={'No active projects'}
              Icon={ProjectIcon}
              className={'widgetEmptyIcon'}
            />
          }
          loading={props.activeProjectsLoading}
          itemHeight={getWidgetCardHeight(theme)}
          style={{ height: '70vw', maxHeight: 280 }}
          renderItem={(item) => (
            <ProjectCard
              clients={props.clients}
              project={item}
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
            <ProjectCount projectCount={props.projects.length} />
            <IncomeThisMonth />
          </div>
        </div>

        <Widget
          title={'Unpaid Invoices'}
          data={[]}
          renderItem={(item) => (
            <UnpaidInvoices
              projectDetails={item}
              key={`unpaid-invoices-${item.id}`}
              style={{ paddingRight: theme.spacing(3) }}
            />
          )}
          EmptyComponent={
            <EmptyIcon
              title={'No unpaid invoices'}
              Icon={InvoiceIcon}
              className={'widgetEmptyIcon'}
            />
          }
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  newProjectData: state.project.newProjectData,
  projects: activeProjects(state),
  activeProjectsLoading: state.project.isLoading,
  userData: state.auth,
  clients: state.clients.clientsData,
  deletingProjectId: state.project.deletingId
})
const mapDispatchToProps = (dispatch: any) => ({
  getProjects: (params: GetProjectParams, filter: ProjectFilters) => {
    return dispatch(getProjects(params, filter))
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
