import React, { useState, useCallback, useMemo } from 'react'
import Layout, { LayoutProps } from 'components/Common/Layout'
import HomeScreen from 'screens/HomeScreen'
import { connect } from 'react-redux'
import { Project, Tab } from 'utils/types'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { makeStyles } from '@material-ui/core'
import NewProjectModal from 'components/Projects/NewProjectModal'
import { createNewProjectRequest } from 'actions/projectActions'
import { ProjectsScreen } from 'screens/ProjectsScreen'
import { Route, Switch } from 'react-router-dom'
import { EditProjectScreen } from 'screens/EditProjectScreen'

const TabIds = {
  dashboard: 'dashboard',
  projects: 'projects',
  portfolio: 'portfolio',
  settings: 'settings',
  storage: 'storage',
  invoices: 'invoices',
  payments: 'payments',
  security: 'security'
}

const Dashboard = (props: any) => {
  const classes = useStyles()

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

  const tabs = useMemo<Array<Tab>>(
    () =>
      Object.values(TabIds).map((id: string) => {
        switch (id) {
          case TabIds.dashboard:
            return {
              id,
              text: 'Dashboard',
              icon: <InboxIcon className={classes.listIconStyle} />
            }

          case TabIds.projects:
            return {
              id,
              text: 'Projects',
              icon: <MailIcon className={classes.listIconStyle} />
            }
          case TabIds.portfolio:
            return {
              id,
              text: 'Portfolio',
              icon: <MailIcon className={classes.listIconStyle} />
            }
          case TabIds.settings:
            return {
              id,
              text: 'Settings',
              icon: <MailIcon className={classes.listIconStyle} />
            }
          case TabIds.storage:
            return {
              id,
              text: 'Storage',
              icon: <MailIcon className={classes.listIconStyle} />
            }
          case TabIds.invoices:
            return {
              id,
              text: 'Invoices',
              icon: <MailIcon className={classes.listIconStyle} />
            }
          case TabIds.payments:
            return {
              id,
              text: 'Payments',
              icon: <MailIcon className={classes.listIconStyle} />
            }
          case TabIds.security:
            return {
              id,
              text: 'Security',
              icon: <MailIcon className={classes.listIconStyle} />
            }
          default:
            return { id: 'default', text: 'Default', icon: null }
        }
      }),
    []
  )

  const [activeTab, setActiveTab] = useState(tabs[0])

  const getSidebarButtonConfig = () => {
    switch (activeTab.id) {
      default:
        return { title: 'New Project', action: openNewProjectModal }
    }
  }

  const handleActiveTabPress = (tab: Tab) => {
    props.history.replace(`/${tab.id}`)
    if (tab.id !== activeTab.id) {
      setActiveTab(tab)
    }
  }

  const getLayoutProps = (): LayoutProps => {
    const sidebarButtonConfig = getSidebarButtonConfig()
    return {
      onActionButtonPress: sidebarButtonConfig.action,
      actionButtonTitle: sidebarButtonConfig.title,
      headerTitle: activeTab.text,
      tabs,
      onTabPress: handleActiveTabPress,
      activeTab
    }
  }

  return (
    <Layout {...getLayoutProps()}>
      <NewProjectModal
        open={newProjectModalOpen}
        onRequestClose={closeNewProjectModal}
        onSubmitClicked={createNewProject}
      />
      <div className={classes.screen}>
        <Switch>
          <Route path='/projects' component={ProjectsScreen} />
          <Route path='/editProjectInfo' component={EditProjectScreen} />
          <Route path='/' component={HomeScreen} />
        </Switch>
      </div>
    </Layout>
  )
}

const useStyles = makeStyles((theme) => ({
  listIconStyle: {
    marginRight: theme.spacing(5),
    color: theme.palette.primary.light,
    fontSize: theme.spacing(3)
  },
  screen: {
    paddingTop: theme.spacing(4)
  }
}))

const mapDispatchToProps = (dispatch: any) => ({
  createNewProject: (projectData: Project) => {
    return dispatch(createNewProjectRequest(projectData))
  }
})

export default connect(null, mapDispatchToProps)(Dashboard)
