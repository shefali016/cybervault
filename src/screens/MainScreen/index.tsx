import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core'

import ProjectsScreen from 'screens/DashboardScreens/ProjectsScreen'
import EditProjectScreen from 'screens/DashboardScreens/EditProjectScreen'
import HomeScreen from 'screens/DashboardScreens/HomeScreen'
import ProfileScreen from 'screens/AccountScreens/ProfileScreen'
import ManageAccountScreen from 'screens/AccountScreens/ManageAccountScreen'
import BrandingScreen from 'screens/AccountScreens/BrandingScreen'
import SecurityScreen from 'screens/SharedScreens/SecurityScreen'
import InvoicesScreen from 'screens/SharedScreens/InvoicesScreen'

import NewProjectModal from 'components/Projects/NewProjectModal'
import Layout, { LayoutProps } from 'components/Common/Layout'
import { ButtonConfig, Project, Tab, User, Account } from 'utils/types'
import { isOnEditProjectScreen } from '../../actions/projectActions'
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
import BankingIcon from '@material-ui/icons/AccountBalance'

import { SIDE_DRAWER_WIDTH } from 'utils/constants/stringConstants'
import { createNewProjectRequest } from 'actions/projectActions'
import SubscriptionScreen from 'screens/AccountScreens/SubscriptionScreen'
// import BankingScreen from 'screens/SharedScreens/BankingScreen'
import PaymentsScreen from 'screens/SharedScreens/PaymentsScreen'
import PortfoliosScreen from 'screens/DashboardScreens/PortfoliosScreen'
import StripeScreen from 'screens/SharedScreens/StripeScreen'
import AccountLinkRefreshScreen from 'screens/Stripe/AccountLinkRefreshScreen'
import { getUser } from 'actions/user'
import { getAccount } from 'actions/account'
import { ReduxState } from 'reducers/rootReducer'
import { AppLoader } from 'components/Common/Core/AppLoader'
import clsx from 'clsx'

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
  // payments: 'payments',
  security: 'security'
  // banking: 'banking'
}

const ScreenViews = {
  dashboard: 'dashboard',
  account: 'account'
}

type DispatchProps = {
  createNewProject: (project: Project) => void
  getUser: (id: string) => void
  getAccount: (id: string) => void
}
type StateProps = {
  userRestored: boolean
  accountRestored: boolean
  user: User
  account: Account
}
type Props = { history: any } & StateProps & DispatchProps

const MainScreen = ({
  createNewProject,
  history,
  userRestored,
  accountRestored,
  getUser,
  getAccount,
  user,
  account
}: Props) => {
  const classes = useStyles()
  const theme = useTheme()

  const getInitialScreenView = () => {
    return Object.values(DashboardTabIds).includes(
      history.location.pathname.replace('/', '')
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
      // case SharedTabIds.payments:
      //   return {
      //     id,
      //     text: 'Payments',
      //     icon: <PaymentIcon className={classes.listIconStyle} />
      //   }
      case SharedTabIds.security:
        return {
          id,
          text: 'Security',
          icon: <SecurityIcon className={classes.listIconStyle} />
        }
      // case SharedTabIds.banking:
      //   return {
      //     id,
      //     text: 'Banking',
      //     icon: <BankingIcon className={classes.listIconStyle} />
      //   }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenView])

  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.id === history.location.pathname.replace('/', '')) ||
      tabs[0]
  )

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
    history.replace(`/${tab.id}`)
    if (tab.id !== activeTab.id) {
      setActiveTab(tab)
    }
  }

  const handleDashboardNavigation = () => {
    history.replace(`/${DashboardTabIds.dashboard}`)
    setScreenView(ScreenViews.dashboard)
    setActiveTab(getTab(DashboardTabIds.dashboard))
  }

  const handleProfileNavigation = () => {
    history.replace(`/${AccountTabIds.profile}`)
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

  // useEffect(() => {
  //   if (location.pathname === '/project') {
  //     onEditProject(true)
  //   } else {
  //     onEditProject(false)
  //   }
  // }, [location])

  const renderLoading = () => (
    <div className={classes.splashScreen}>
      <AppLoader color={theme.palette.primary.main} />
    </div>
  )

  useEffect(() => {
    if (!userRestored) {
      getUser(user.id)
    }
    if (!accountRestored) {
      getAccount(account.id)
    }
  }, [])

  if (!(userRestored && accountRestored)) {
    return renderLoading()
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
          <Route path='/manage' component={ManageAccountScreen} />
          <Route path='/branding' component={BrandingScreen} />
          <Route path='/subscription' component={SubscriptionScreen} />
          <Route path='/security' component={SecurityScreen} />
          <Route path='/invoices' component={InvoicesScreen} />
          <Route path='/portfolio' component={PortfoliosScreen} />
          <Route
            path='/refresh_account_link/:id'
            component={AccountLinkRefreshScreen}
          />
          <Route path='/' component={HomeScreen} />
        </Switch>
      </div>
    </Layout>
  )
}

const useStyles = makeStyles((theme) => ({
  splashScreen: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default
  },
  listIconStyle: {
    marginRight: theme.spacing(5),
    color: theme.palette.primary.light,
    fontSize: theme.spacing(3)
  },
  screen: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
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

const mapStateToProps = (state: ReduxState): StateProps => ({
  accountRestored: state.auth.accountRestored,
  userRestored: state.auth.userRestored,
  user: state.auth.user as User,
  account: state.auth.account as Account
})

const mapDispatchToProps: DispatchProps = {
  createNewProject: (projectData: Project) =>
    createNewProjectRequest(projectData),
  getUser: (id: string) => getUser(id),
  getAccount: (id: string) => getAccount(id)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
