import React, { useState, useCallback, useMemo } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'

import Layout, { LayoutProps } from 'components/Common/Layout'
import HomeScreen from 'screens/HomeScreen'
import ProfileScreen from 'screens/AccountScreens/ProfileScreen'
import { ButtonConfig, Project, Tab } from 'utils/types'
import NewProjectModal from 'components/Projects/NewProjectModal'
import { createNewProjectRequest } from 'actions/projectActions'
import { ProjectsScreen } from 'screens/ProjectsScreen'
import { EditProjectScreen } from 'screens/EditProjectScreen'

import AddIcon from '@material-ui/icons/Add'
import BackArrow from '@material-ui/icons/ArrowBack'
import DashboardIcon from '@material-ui/icons/Home'
import ProjectIcon from '@material-ui/icons/Collections'
import PortfolioIcon from '@material-ui/icons/FolderSpecial'
import SettingsIcon from '@material-ui/icons/Settings'
import StorageIcon from '@material-ui/icons/Storage'
import InvoiceIcon from '@material-ui/icons/Receipt'
import PaymentIcon from '@material-ui/icons/Payment'
import SecurityIcon from '@material-ui/icons/Security'
import ProfileIcon from '@material-ui/icons/Person'
import ManageIcon from '@material-ui/icons/Apartment'
import BrandingIcon from '@material-ui/icons/Brush'
import SubscriptionIcon from '@material-ui/icons/LocalActivity'

import { SIDE_DRAWER_WIDTH } from 'utils/constants/stringConstants'

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

  const getInitialScreenView = () => {
    return Object.values(DashboardTabIds).includes(
      props.history.location.pathname.replace('/', '')
    )
      ? ScreenViews.dashboard
      : ScreenViews.account
  }

  const [screenView, setScreenView] = useState(getInitialScreenView())

  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)
  const openNewProjectModal = useCallback(
    () => setNewProjectModalOpen(true),
    []
  )
  const closeNewProjectModal = useCallback(
    () => setNewProjectModalOpen(false),
    []
  )
  const createNewProject = useCallback((projectData) => {
    props.createNewProject(projectData, props.userData.account)
  }, [])

  const getTab = (id: string) => {
    switch (id) {
      // Dashboard tabs
      case DashboardTabIds.dashboard:
        return {
          id,
          text: 'Dashboard',
          icon: <DashboardIcon className={classes.listIconStyle} />
        }

      case DashboardTabIds.projects:
        return {
          id,
          text: 'Projects',
          icon: <ProjectIcon className={classes.listIconStyle} />
        }
      case DashboardTabIds.portfolio:
        return {
          id,
          text: 'Portfolio',
          icon: <PortfolioIcon className={classes.listIconStyle} />
        }
      case DashboardTabIds.settings:
        return {
          id,
          text: 'Settings',
          icon: <SettingsIcon className={classes.listIconStyle} />
        }
      case DashboardTabIds.storage:
        return {
          id,
          text: 'Storage',
          icon: <StorageIcon className={classes.listIconStyle} />
        }
      case SharedTabIds.invoices:
        return {
          id,
          text: 'Invoices',
          icon: <InvoiceIcon className={classes.listIconStyle} />
        }
      case SharedTabIds.payments:
        return {
          id,
          text: 'Payments',
          icon: <PaymentIcon className={classes.listIconStyle} />
        }
      case SharedTabIds.security:
        return {
          id,
          text: 'Security',
          icon: <SecurityIcon className={classes.listIconStyle} />
        }
      // Account tabs
      case AccountTabIds.profile:
        return {
          id,
          text: 'Profile',
          icon: <ProfileIcon className={classes.listIconStyle} />
        }
      case AccountTabIds.manage:
        return {
          id,
          text: 'Manage Account',
          icon: <ManageIcon className={classes.listIconStyle} />
        }
      case AccountTabIds.branding:
        return {
          id,
          text: 'Branding',
          icon: <BrandingIcon className={classes.listIconStyle} />
        }
      case AccountTabIds.subscription:
        return {
          id,
          text: 'Subscription',
          icon: <SubscriptionIcon className={classes.listIconStyle} />
        }
      case AccountTabIds.storage:
        return {
          id,
          text: 'Storage',
          icon: <StorageIcon className={classes.listIconStyle} />
        }

      default:
        return { id: 'default', text: 'Default', icon: null }
    }
  }

  const tabs = useMemo<Array<Tab>>(() => {
    const tabids = Object.values(
      screenView === ScreenViews.dashboard ? DashboardTabIds : AccountTabIds
    )
    const sharedTabIds = Object.values(SharedTabIds)
    return [...tabids, ...sharedTabIds].map(getTab)
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
    paddingTop: theme.spacing(5),
    minWidth: window.outerWidth - SIDE_DRAWER_WIDTH,
    [theme.breakpoints.down('sm')]: {
      minWidth: window.outerWidth - theme.spacing(8)
    }
  },
  buttonIcon: {
    marginRight: 15,
    marginLeft: -30,
    color: '#fff',
    fontSize: 30
  }
}))

const mapStateToProps = (state: any) => ({
  userData: state.auth
})

const mapDispatchToProps = (dispatch: any) => ({
  createNewProject: (projectData: Project, account: Account) => {
    return dispatch(createNewProjectRequest(projectData, account))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
