import React, { useState, useCallback, useMemo } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'

import ProjectsScreen from 'screens/DashboardScreens/ProjectsScreen'
import HomeScreen from 'screens/DashboardScreens/HomeScreen'
import ProfileScreen from 'screens/AccountScreens/ProfileScreen'
import ManageAccountScreen from 'screens/AccountScreens/ManageAccountScreen'
import BrandingScreen from 'screens/AccountScreens/BrandingScreen'
import SecurityScreen from 'screens/SharedScreens/SecurityScreen'
import InvoicesScreen from 'screens/SharedScreens/InvoicesScreen'
import InvoicesClientScreen from 'screens/SharedScreens/InvoicesClientScreen'
import PaymentMethodsScreen from 'screens/Stripe/PaymentMethodsScreen'
import BillingHistoryScreen from 'screens/Stripe/BillingHistoryScreen'
import ClientsScreen from 'screens/DashboardScreens/ClientsScreen'

import NewProjectModal from 'components/Projects/NewProjectModal'
import Layout, { LayoutProps } from 'components/Common/Layout'
import {
  ButtonConfig,
  Project,
  Tab,
  Subscription,
  SubscriptionType,
  SubscriptionDetails
} from 'utils/Interface'
import AddIcon from '@material-ui/icons/Add'
import BackArrow from '@material-ui/icons/ArrowBack'
import DashboardIcon from '@material-ui/icons/Home'
import ProjectIcon from '@material-ui/icons/Collections'
import PortfolioIcon from '@material-ui/icons/FolderSpecial'
import SettingsIcon from '@material-ui/icons/Settings'
import InvoiceIcon from '@material-ui/icons/Receipt'
import SecurityIcon from '@material-ui/icons/Security'
import ProfileIcon from '@material-ui/icons/Person'
import ManageIcon from '@material-ui/icons/Apartment'
import BrandingIcon from '@material-ui/icons/Brush'
import SubscriptionIcon from '@material-ui/icons/LocalActivity'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

import { createNewProjectRequest } from 'actions/projectActions'
import SubscriptionScreen from 'screens/AccountScreens/SubscriptionScreen'
import PortfoliosScreen from 'screens/DashboardScreens/PortfolioScreen'
import PortfolioFolderScreen from 'screens/DashboardScreens/PortfolioFolderScreen'

import AccountLinkRefreshScreen from 'screens/Stripe/AccountLinkRefreshScreen'
import { ReduxState } from 'reducers/rootReducer'
import { getSubscriptionDetails, getSubscriptionType } from 'utils/subscription'
import { findProjectLimit } from 'utils/helpers'
import clsx from 'clsx'

export const DashboardTabIds = {
  dashboard: 'dashboard',
  projects: 'projects',
  portfolio: 'portfolio',
  invoices: 'invoices',
  settings: 'settings',
  clients: 'clients'
}

export const AccountTabIds = {
  manage: 'manage',
  profile: 'profile',
  branding: 'branding'
}

export const ChildTabs = {
  paymentMethods: 'paymentmethods',
  billing: 'billing'
}

export const SharedTabIds = {
  subscription: 'subscription',
  security: 'security'
}

export const ScreenViews = {
  dashboard: 'dashboard',
  account: 'account'
}

type DispatchProps = {
  createNewProject: (project: Project) => void
}
type StateProps = {
  allProjectsData: Array<Project>
  accountSubscription: Subscription
}
type Props = { history: any } & StateProps & DispatchProps

const MainScreen = ({
  createNewProject,
  history,
  allProjectsData,
  accountSubscription
}: Props) => {
  const classes = useStyles()

  const getInitialScreenView = () => {
    return Object.values({ ...AccountTabIds }).includes(
      history.location.pathname.replace('/', '')
    )
      ? ScreenViews.account
      : ScreenViews.dashboard
  }

  const [screenView, setScreenView] = useState(getInitialScreenView())

  const isBeyondProjectLimit = useMemo(() => {
    const subscriptionType: SubscriptionType = getSubscriptionType(
      accountSubscription
    )
    const subscriptionDetails: SubscriptionDetails = getSubscriptionDetails(
      subscriptionType
    )
    const allowedProjects = subscriptionDetails.numProjects
    const currentMonthProjects = allProjectsData
      ? findProjectLimit(allProjectsData)
      : 0

    return currentMonthProjects >= allowedProjects
  }, [accountSubscription, allProjectsData])

  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)

  const handleProjectModalShow = () => {
    openNewProjectModal()
  }

  const openNewProjectModal = useCallback(
    () => setNewProjectModalOpen(true),
    []
  )
  const closeNewProjectModal = useCallback(
    () => setNewProjectModalOpen(false),
    []
  )

  const getTab = (id: string): Tab => {
    switch (id) {
      // Dashboard tabs
      case DashboardTabIds.projects:
        return {
          id,
          text: 'Projects',
          icon: <ProjectIcon className={classes.listIconStyle} />
        }
      case DashboardTabIds.portfolio:
        return {
          id,
          text: 'Portfolios',
          icon: <PortfolioIcon className={classes.listIconStyle} />
        }
      case DashboardTabIds.invoices:
        return {
          id,
          text: 'Invoices',
          icon: <InvoiceIcon className={classes.listIconStyle} />
        }
      case DashboardTabIds.settings:
        return {
          id,
          text: 'Settings',
          icon: <SettingsIcon className={classes.listIconStyle} />,
          onPress: () => {
            history.replace(`/manage`)
            setScreenView(ScreenViews.account)
          }
        }
      case DashboardTabIds.clients:
        return {
          id,
          text: 'Clients',
          icon: <AccountBoxIcon className={classes.listIconStyle} />
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
      case SharedTabIds.subscription:
      case ChildTabs.billing:
      case ChildTabs.paymentMethods:
        return {
          id: 'subscription',
          text: 'Subscription',
          icon: <SubscriptionIcon className={classes.listIconStyle} />
        }

      case DashboardTabIds.dashboard:
      default:
        return {
          id,
          text: 'Dashboard',
          icon: <DashboardIcon className={classes.listIconStyle} />
        }
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
    getTab(history.location.pathname.replace('/', ''))
  )

  console.log(activeTab)

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
          onClick: handleProjectModalShow,
          icon: <AddIcon className={classes.buttonIcon} />
        }
    }
  }

  const handleActiveTabPress = (tab: Tab) => {
    if (typeof tab.onPress === 'function') {
      tab.onPress()
    } else {
      history.replace(`/${tab.id}`)
    }
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

  const handleUpgradeSubscription = () => {
    closeNewProjectModal()
    setTimeout(
      () =>
        history.push({
          pathname: '/subscription',
          state: { params: { isSubscribing: true } }
        }),
      1
    )
  }

  return (
    <Layout {...getLayoutProps()}>
      <NewProjectModal
        onUpgradeSubscription={handleUpgradeSubscription}
        open={newProjectModalOpen}
        onRequestClose={closeNewProjectModal}
        onSubmitClicked={createNewProject}
        isBeyondLimit={isBeyondProjectLimit}
      />
      <div className={clsx(classes.screen, 'screenTopPadding')}>
        <Switch>
          <Route path='/projects' component={ProjectsScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/manage' component={ManageAccountScreen} />
          <Route path='/branding' component={BrandingScreen} />
          <Route path='/subscription' component={SubscriptionScreen} />
          <Route path='/security' component={SecurityScreen} />
          <Route path='/invoices' component={InvoicesScreen} />
          <Route path='/clients' component={ClientsScreen} />
          <Route
            path='/clientInvoices/:accId/:id'
            component={InvoicesClientScreen}
          />
          <Route path='/portfolio' component={PortfoliosScreen} exact={true} />
          <Route
            path='/portfolioFolder/:id'
            component={PortfolioFolderScreen}
          />
          <Route path='/paymentmethods' component={PaymentMethodsScreen} />
          <Route path='/billing' component={BillingHistoryScreen} />
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
  listIconStyle: {
    marginRight: theme.spacing(5),
    color: theme.palette.primary.light,
    fontSize: theme.spacing(3)
  },
  screen: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowX: 'hidden'
  },
  portfolioScreen: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowX: 'hidden'
  },
  buttonIcon: {
    marginRight: 15,
    marginLeft: -30,
    color: '#fff',
    fontSize: 30
  }
}))

const mapStateToProps = (state: ReduxState): StateProps => ({
  allProjectsData: state.project.allProjectsData as Array<Project>,
  accountSubscription: state.stripe.accountSubscription as Subscription
})

const mapDispatchToProps: DispatchProps = {
  createNewProject: (projectData: Project) =>
    createNewProjectRequest(projectData)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
