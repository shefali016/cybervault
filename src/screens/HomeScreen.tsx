import React, { useCallback, useEffect, useState } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import {
  createNewProjectRequest,
  clearNewProjectData
} from '../actions/projectActions'
import { Typography, Grid } from '@material-ui/core'
import ProjectCard from '../components/Cards/ProjectDescriptionCard'
import UnpaidInvoices from '../components/Cards/UnpaidInvoices'
import PendingInvoices from '../components/Cards/PendingInvoices'
import IncomeThisMonth from '../components/Cards/IncomeThisMonth'
import ProjectCount from '../components/Cards/ProjectCount'
import ProfitsExpenses from '../components/Cards/ProfitsExpenses'
import Layout from '../components/Common/Layout'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { AUTO, COLUMN, FLEX } from 'utils/constants/stringConstants'
import NewProjectModal from '../components/Projects/NewProjectModal'
import Widget from '../components/Common/Widget'
import * as Types from 'utils/types'

const PROJECT_DATA = [
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    startDate: '2020-01-01',
    budget: 10000
  },
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    startDate: '2020-01-01',
    budget: 10000
  },
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    startDate: '2020-01-01',
    budget: 10000
  },
  {
    name: 'Nike Summer Campaign',
    description: 'Doc 2016 campaign with audi Q6',
    startDate: '2020-01-01',
    budget: 10000
  }
]
const UNPAID_INVOICES_DATA = [1, 2, 3, 4]

export const HomeScreen = (props: any) => {
  useEffect(() => {
    if (props.newProjectData) {
      setNewProjectModalOpen(false)
      props.clearNewProjectData()
    }
    if (!props.isLoggedIn && !props.user) {
      loggedOut(props)
    }
  }, [props.isLoggedIn])

  const loggedOut = (props: any) => {
    props.history.push('/')
  }
  const classes = useStyles()
  const theme = useTheme()

  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)
  const openNewProjectModal = useCallback(
    () => setNewProjectModalOpen(true),
    []
  )
  const closeNewProjectModal = useCallback(
    () => setNewProjectModalOpen(false),
    []
  )
  const createNewProject = useCallback(
    (projectData) => props.createNewProject(projectData),
    []
  )
  return (
    <div className={classes.background}>
      <Layout
        actionButtonTitle={'New Project'}
        history={props.history}
        onActionButtonPress={openNewProjectModal}>
        <div className={'dashboardContainer'}>
          <NewProjectModal
            open={newProjectModalOpen}
            onRequestClose={closeNewProjectModal}
            onSubmitClicked={createNewProject}
          />
          <Widget
            data={PROJECT_DATA}
            title={'Active Projects'}
            emptyMessage={'No Projects found'}
            renderItem={(item) => (
              <ProjectCard
                project={item}
                isPopover={true}
                key={`project-card-${item.id}`}
                style={{ marginRight: theme.spacing(3) }}
              />
            )}
          />
          <div className={classes.invoicingWrapper}>
            <Typography
              variant={'body1'}
              className={classes.sectionTitle}
              color={'textPrimary'}>
              Invoicing and Analytics
            </Typography>
            <div className={classes.middleCardsWrapper}>
              <PendingInvoices className={classes.widgetItem} />
              <ProfitsExpenses className={classes.widgetItem} />
              <ProjectCount
                className={classes.widgetItem}
                projectCount={PROJECT_DATA.length}
              />
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
                style={{ marginRight: theme.spacing(3) }}
              />
            )}
            emptyMessage={'No Projects found'}
          />
        </div>
      </Layout>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
  newProjectData: state.project.newProjectData
})

const mapDispatchToProps = (dispatch: any) => ({
  createNewProject: (projectData: Types.Project) => {
    return dispatch(createNewProjectRequest(projectData))
  },

  clearNewProjectData: () => {
    return dispatch(clearNewProjectData())
  }
})

const useStyles = makeStyles((theme) => ({
  invoicingWrapper: { marginBottom: theme.spacing(4) },
  middleCardsWrapper: {
    display: FLEX,
    [theme.breakpoints.down('sm')]: {
      flexDirection: COLUMN
    }
  },
  sectionTitle: { marginBottom: theme.spacing(1) },
  background: {
    display: 'grid',
    backgroundColor: '#24262B',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  dashboardContainer: {
    padding: theme.spacing(4)
  },
  widgetItem: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(3)
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3)
    }
  }
}))
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
