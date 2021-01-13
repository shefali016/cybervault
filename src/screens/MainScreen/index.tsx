import React, { useState, useCallback, useMemo } from 'react'
import Layout, { LayoutProps } from 'components/Common/Layout'
import HomeScreen from 'screens/HomeScreen'
import { connect } from 'react-redux'
import { ButtonConfig, Project, Tab } from 'utils/types'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import { makeStyles } from '@material-ui/core'
import NewProjectModal from 'components/Projects/NewProjectModal'
import { createNewProjectRequest } from 'actions/projectActions'
import { ProjectsScreen } from 'screens/ProjectsScreen'
import { Route, Switch } from 'react-router-dom'
import { EditProjectScreen } from 'screens/EditProjectScreen'
import AddIcon from '@material-ui/icons/Add'
import BackArrow from '@material-ui/icons/ArrowBack'
import ProfileScreen from 'screens/AccountScreens/ProfileScreen'

const DashboardTabIds = {
  dashboard: 'dashboard',
  projects: 'projects',
  portfolio: 'portfolio',
  settings: 'settings',
  storage: 'storage'
}

const AccountTabIds = {
  profile: 'profile',
  manage: 'manage',
  branding: 'branding',
  subscription: 'subscription',
  storage: 'storage'
}

const SharedTabIds = {
  invoices: 'invoices',
  payments: 'payments',
  security: 'security'
}

const ScreenViews = {
  dashboard: 'dashboard',
  account: 'account'
}

const MainScreen = (props: any) => {
  const classes = useStyles()

  const getInitialScreenView = () =>
    Object.values(DashboardTabIds).includes(props.history.location)

  const [screenView, setScreenView] = useState(ScreenViews.dashboard)

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

  const getTab = (id: string) => {
    switch (id) {
      // Dashboard tabs
      case DashboardTabIds.dashboard:
        return {
          id,
          text: 'Dashboard',
          icon: <InboxIcon className={classes.listIconStyle} />
        }

      case DashboardTabIds.projects:
        return {
          id,
          text: 'Projects',
          icon: <MailIcon className={classes.listIconStyle} />
        }
      case DashboardTabIds.portfolio:
        return {
          id,
          text: 'Portfolio',
          icon: <MailIcon className={classes.listIconStyle} />
        }
      case DashboardTabIds.settings:
        return {
          id,
          text: 'Settings',
          icon: <MailIcon className={classes.listIconStyle} />
        }
      case DashboardTabIds.storage:
        return {
          id,
          text: 'Storage',
          icon: <MailIcon className={classes.listIconStyle} />
        }
      case SharedTabIds.invoices:
        return {
          id,
          text: 'Invoices',
          icon: <MailIcon className={classes.listIconStyle} />
        }
      case SharedTabIds.payments:
        return {
          id,
          text: 'Payments',
          icon: <MailIcon className={classes.listIconStyle} />
        }
      case SharedTabIds.security:
        return {
          id,
          text: 'Security',
          icon: <MailIcon className={classes.listIconStyle} />
        }
      // Account tabs
      case AccountTabIds.profile:
        return {
          id,
          text: 'Profile',
          icon: <MailIcon className={classes.listIconStyle} />
        }
      case AccountTabIds.manage:
        return {
          id,
          text: 'Manage Account',
          icon: <MailIcon className={classes.listIconStyle} />
        }
      case AccountTabIds.branding:
        return {
          id,
          text: 'Branding',
          icon: <MailIcon className={classes.listIconStyle} />
        }
      case AccountTabIds.subscription:
        return {
          id,
          text: 'Subscription',
          icon: <MailIcon className={classes.listIconStyle} />
        }
      case AccountTabIds.storage:
        return {
          id,
          text: 'Storage',
          icon: <MailIcon className={classes.listIconStyle} />
        }

      default:
        return { id: 'default', text: 'Default', icon: null }
    }
  }

  const tabs = useMemo<Array<Tab>>(() => {
    const tabids =
      screenView === ScreenViews.dashboard ? DashboardTabIds : AccountTabIds
    return Object.values(tabids).map(getTab)
  }, [screenView])

  const [activeTab, setActiveTab] = useState(tabs[0])

  const getSidebarButtonConfig = (): ButtonConfig => {
    if (screenView === ScreenViews.account) {
      return {
        title: 'Dashboard',
        onClick: handleDashboardNavigation,
        icon: <BackArrow className={classes.buttonIcon} />
      }
    }

    switch (activeTab.id) {
      default:
        return {
          title: 'New Project',
          onClick: openNewProjectModal,
          icon: <AddIcon className={classes.buttonIcon} />
        }
    }
  }

  const handleActiveTabPress = (tab: Tab) => {
    props.history.replace(`/${tab.id}`)
    if (tab.id !== activeTab.id) {
      setActiveTab(tab)
    }
  }

  const handleDashboardNavigation = () => {
    props.history.replace(`/${DashboardTabIds.dashboard}`)
    setScreenView(ScreenViews.dashboard)
    setActiveTab(getTab(DashboardTabIds.dashboard))
  }

  const handleProfileNavigation = () => {
    props.history.replace(`/${AccountTabIds.profile}`)
    setScreenView(ScreenViews.account)
    setActiveTab(getTab(AccountTabIds.profile))
  }

  const getLayoutProps = (): LayoutProps => {
    const sidebarButtonConfig = getSidebarButtonConfig()
    return {
      actionButtonConfig: sidebarButtonConfig,
      headerTitle: activeTab.text,
      tabs,
      onTabPress: handleActiveTabPress,
      activeTab,
      onProfileClick: handleProfileNavigation
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
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/project' component={EditProjectScreen} />
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
  },
  buttonIcon: {
    marginRight: 15,
    marginLeft: -30,
    color: '#fff',
    fontSize: 30
  }
}))

const mapDispatchToProps = (dispatch: any) => ({
  createNewProject: (projectData: Project) => {
    return dispatch(createNewProjectRequest(projectData))
  }
})

export default connect(null, mapDispatchToProps)(MainScreen)
