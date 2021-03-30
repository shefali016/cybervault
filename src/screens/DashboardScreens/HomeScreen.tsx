import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { deleteProjectRequest, getProjects } from '../../actions/projectActions'
import { Typography } from '@material-ui/core'
import { ProjectCard } from '../../components/Cards/ProjectCard'
import UnpaidInvoice from '../../components/Cards/UnpaidInvoices'
import PendingInvoices from '../../components/Cards/PendingInvoices'
import IncomeThisMonth from '../../components/Cards/IncomeThisMonth'
import ProjectCount from '../../components/Cards/ProjectCount'
import ProfitsExpenses from '../../components/Cards/ProfitsExpenses'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { COLUMN } from 'utils/constants/stringConstants'
import Widget from '../../components/Common/Widget'
import {
  Account,
  Invoice,
  Project,
  User,
  Client,
  ProjectCache,
  ClientCache
} from 'utils/Interface'
import clsx from 'clsx'
import { EmptyIcon } from 'components/EmptyIcon'
import ProjectIcon from '@material-ui/icons/Collections'
import { GetParams } from 'utils/Interface/api'
import { activeProjects, filteredInvoices } from 'utils/selectors'
import {
  InvoiceFilters,
  InvoiceStatuses,
  ProjectFilters,
  ProjectStatuses
} from 'utils/enums'
import InvoiceIcon from '@material-ui/icons/Receipt'
import { WIDGET_ITEM_HEIGHT } from 'utils/globalStyles'
import { ReduxState } from 'reducers/rootReducer'
import { useOnChange } from 'utils/hooks'
import { getInvoices } from 'actions/invoiceActions'

type DispatchProps = {
  getProjects: (params: GetParams, filter: ProjectFilters) => void
  deleteProject: (projectId: string) => void
  getInvoices: (params: GetParams, filter: InvoiceFilters) => void
}

type StateProps = {
  activeProjects: Project[]
  activeProjectsLoading: boolean
  unpaidInvoices: Invoice[]
  user: User
  account: Account
  clients: Client[]
  deletingProjectId: string | null
  updateProjectSuccess: boolean
  projectCache: ProjectCache
  clientCache: ClientCache
}

type Props = { history: any } & StateProps & DispatchProps

const HomeScreen = (props: Props) => {
  useEffect(() => {
    loadProjects()
    loadUpaidInvoices()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useOnChange(props.updateProjectSuccess, (success: boolean) => {
    if (success) {
      loadProjects()
    }
  })

  const loadProjects = () => {
    props.getProjects(
      {
        where: ['status', '==', ProjectStatuses.PROGRESS],
        orderBy: 'updatedAt'
      },
      ProjectFilters.ACTIVE
    )
  }

  const loadUpaidInvoices = () => {
    props.getInvoices(
      {
        where: ['status', '!=', InvoiceStatuses.PAID]
      },
      InvoiceFilters.UNPAID
    )
  }

  const classes = useStyles()
  const theme = useTheme()

  const handleProjectClick = (project: Project) =>
    props.history.push(`/project/${project.id}`)

  const handleInvoiceClick = (invoice: Invoice) =>
    props.history.push(`/invoice/${invoice.id}/${props.account.id}`)

  return (
    <div className='screenContainer'>
      <div className={'screenInner'}>
        <Widget
          data={props.activeProjects}
          title={'Active Projects'}
          EmptyComponent={
            <EmptyIcon
              title={'No active projects'}
              Icon={ProjectIcon}
              className={'widgetEmptyIcon'}
            />
          }
          loading={props.activeProjectsLoading}
          style={{ height: WIDGET_ITEM_HEIGHT }}
          renderItem={(item) => (
            <ProjectCard
              clients={props.clients}
              project={item}
              key={`project-card-${item.id}`}
              containerStyle={{
                paddingRight: theme.spacing(3)
              }}
              onClick={handleProjectClick}
              account={props.account}
              userInfo={props.user}
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
            <ProjectCount projectCount={props.activeProjects.length} />
            <IncomeThisMonth />
          </div>
        </div>

        <Widget
          title={'Unpaid Invoices'}
          data={props.unpaidInvoices}
          renderItem={(invoice: Invoice) => (
            <UnpaidInvoice
              invoice={invoice}
              key={`unpaid-invoices-${invoice.id}`}
              style={{ paddingRight: theme.spacing(3) }}
              projectCache={props.projectCache}
              clientCache={props.clientCache}
              onClick={handleInvoiceClick}
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

const mapStateToProps = (state: ReduxState) => ({
  activeProjects: activeProjects(state),
  activeProjectsLoading: state.project.loadingFilters.has(
    ProjectFilters.ACTIVE
  ),
  unpaidInvoices: filteredInvoices(state, { filter: InvoiceFilters.UNPAID }),
  user: state.auth.user as User,
  account: state.auth.account as Account,
  clients: state.clients.clientsData,
  deletingProjectId: state.project.deletingId,
  updateProjectSuccess: state.project.updateProjectSuccess,
  projectCache: state.project.projectCache,
  clientCache: state.clients.cache
})

const mapDispatchToProps = (dispatch: any) => ({
  getProjects: (params: GetParams, filter: ProjectFilters) => {
    return dispatch(getProjects(params, filter))
  },
  deleteProject: (projectId: string) => {
    return dispatch(deleteProjectRequest(projectId))
  },
  getInvoices: (params: GetParams, filter: InvoiceFilters) =>
    dispatch(getInvoices(params, filter))
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
