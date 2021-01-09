import React, { useCallback, useEffect, useState } from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { logout } from '../actions/authActions'
import {
  createNewProjectRequest,
  clearNewProjectData,
  getAllProjectsRequest
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

const UNPAID_INVOICES_DATA = [1, 2, 3, 4]

export const HomeScreen = (props: any) => {
  const [allProjects, setAllProjects] = useState([])
  useEffect(() => {
    if (props.newProjectData) {
      setNewProjectModalOpen(false)
      props.clearNewProjectData()
    }
    if (!props.isLoggedIn && !props.user) {
      loggedOut(props)
    }
    if (props.allProjectsData && props.allProjectsData !== allProjects) {
      setAllProjects(props.allProjectsData)
    }
  }, [props.isLoggedIn, props.newProjectData, props.allProjectsData])

  useEffect(() => {
    props.getAllProjectsData()
  }, [])

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
            data={allProjects}
            title={'Active Projects'}
            emptyMessage={'No Projects found'}
            renderItem={(item) => (
              <ProjectCard
                project={item}
                isPopover={true}
                key={`project-card-${item.projectId}`}
                style={{ marginRight: theme.spacing(3) }}
                history={props.history}
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
                projectCount={allProjects.length}
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
  newProjectData: state.project.newProjectData,
  allProjectsData: state.project.allProjectsData
})

const mapDispatchToProps = (dispatch: any) => ({
  createNewProject: (projectData: Types.Project) => {
    return dispatch(createNewProjectRequest(projectData))
  },

  clearNewProjectData: () => {
    return dispatch(clearNewProjectData())
  },
  getAllProjectsData: () => {
    return dispatch(getAllProjectsRequest())
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
