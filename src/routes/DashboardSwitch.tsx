import React, {
  useState,
  useCallback,
  useMemo,
  createContext,
  useEffect
} from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'

// import ProjectsScreen from 'screens/DashboardScreens/ProjectsScreen'
import ProjectsScreen from 'screens/DashboardScreens/AllProjectsScreen'
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
  SubscriptionDetails,
  Account,
  Client,
  User
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
import PortfolioFolderScreen from '../screens/DashboardScreens/PortfolioFolderScreen'

import AccountLinkRefreshScreen from 'screens/Stripe/AccountLinkRefreshScreen'
import { ReduxState } from 'reducers/rootReducer'
import { getSubscriptionDetails, getSubscriptionType } from 'utils/subscription'
import { findProjectLimit } from 'utils/helpers'
import clsx from 'clsx'
import { useModalState, useOnChange } from 'utils/hooks'
import InvoiceModal from 'components/Invoices/InvoiceModal'
import history from 'services/history'
import { getClients } from 'apis/clients'
import { getAllClientsRequest } from 'actions/clientActions'

export const DashboardTabIds = {
  dashboard: 'dashboard',
  projects: 'projects',
  portfolio: 'portfolio',
  invoices: 'invoices',
  clients: 'clients',
  settings: 'settings'
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

export const ModalContext = createContext({
  toggleInvoiceModal: (open: boolean) => () => {},
  toggleProjectModal: (open: boolean) => () => {}
})

type DispatchProps = {
  createNewProject: (project: Project) => void
  getClients: () => void
}
type StateProps = {
  allProjectsData: Array<Project>
  accountSubscription: Subscription
  account: Account
  userInfo: User
}
type Props = { history: any } & StateProps & DispatchProps

const MainScreen = ({
  createNewProject,
  history,
  allProjectsData,
  accountSubscription,
  account,
  userInfo,
  getClients
}: Props) => {
  const classes = useStyles()

  useEffect(() => {
    getClients()
  }, [])

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

  // Project handling

  const [
    newProjectModalOpen,
    setNewProjectModalOpen,
    toggleProjectModal
  ] = useModalState(false)

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

  // Invoice handling

  const [
    invoiceModalOpen,
    setInvoiceModalOpen,
    toggleInvoiceModal
  ] = useModalState(false)

  const getTab = (id: string): Tab => {
    const iconProps = { className: 'sideBarIcon' }
    switch (id) {
      // Dashboard tabs
      case DashboardTabIds.projects:
        return {
          id,
          text: 'Projects',
          icon: <ProjectIcon {...iconProps} />
        }
      case DashboardTabIds.portfolio:
        return {
          id,
          text: 'Portfolios',
          icon: <PortfolioIcon {...iconProps} />
        }
      case DashboardTabIds.invoices:
        return {
          id,
          text: 'Invoices',
          icon: <InvoiceIcon {...iconProps} />
        }
      case DashboardTabIds.settings:
        return {
          id: 'manage',
          text: 'Settings',
          icon: <SettingsIcon {...iconProps} />,
          onPress: () => {
            history.replace(`/manage`)
            setScreenView(ScreenViews.account)
          }
        }
      case DashboardTabIds.clients:
        return {
          id,
          text: 'Clients',
          icon: <AccountBoxIcon {...iconProps} />
        }
      case SharedTabIds.security:
        return {
          id,
          text: 'Security',
          icon: <SecurityIcon {...iconProps} />
        }
      // Account tabs
      case AccountTabIds.profile:
        return {
          id,
          text: 'Profile',
          icon: <ProfileIcon {...iconProps} />
        }
      case AccountTabIds.manage:
        return {
          id,
          text: 'Manage Account',
          icon: <ManageIcon {...iconProps} />
        }
      case AccountTabIds.branding:
        return {
          id,
          text: 'Branding',
          icon: <BrandingIcon {...iconProps} />
        }
      case SharedTabIds.subscription:
      case ChildTabs.billing:
      case ChildTabs.paymentMethods:
        return {
          id: 'subscription',
          text: 'Subscription',
          icon: <SubscriptionIcon {...iconProps} />
        }

      case DashboardTabIds.dashboard:
      default:
        return {
          id,
          text: 'Dashboard',
          icon: <DashboardIcon {...iconProps} />
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

  useOnChange(history.location.pathname, () => {
    const tab = getTab(history.location.pathname.replace('/', ''))
    if (tab && tab.id !== activeTab.id) {
      setActiveTab(tab)
    }
  })

  const getSidebarButtonConfig = (): ButtonConfig => {
    if (screenView === ScreenViews.account) {
      return {
        title: 'Dashboard',
        onClick: handleDashboardNavigation,
        icon: <BackArrow className={classes.buttonIcon} />
      }
    }

    switch (activeTab.id) {
      case DashboardTabIds.invoices:
        return {
          title: 'Invoice Project',
          onClick: toggleInvoiceModal(true),
          icon: <AddIcon className={classes.buttonIcon} />
        }
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

  const handleCreateProject = () => {
    setInvoiceModalOpen(false)
    history.push('/projects')
    setNewProjectModalOpen(true)
  }

  return (
    <ModalContext.Provider value={{ toggleProjectModal, toggleInvoiceModal }}>
      <Layout {...getLayoutProps()}>
        <NewProjectModal
          onUpgradeSubscription={handleUpgradeSubscription}
          open={newProjectModalOpen}
          onRequestClose={closeNewProjectModal}
          onSubmitClicked={createNewProject}
          isBeyondLimit={isBeyondProjectLimit}
        />
        <InvoiceModal
          open={invoiceModalOpen}
          onRequestClose={toggleInvoiceModal(false)}
          account={account}
          userInfo={userInfo}
          onCreateProject={handleCreateProject}
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
            <Route
              path='/portfolio'
              component={PortfoliosScreen}
              exact={true}
            />
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
    </ModalContext.Provider>
  )
}

const useStyles = makeStyles((theme) => ({
  listIconStyle: {
    marginRight: theme.spacing(4),
    color: theme.palette.primary.light,
    fontSize: theme.spacing(3.2)
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
  accountSubscription: state.stripe.accountSubscription as Subscription,
  account: state.auth.account as Account,
  userInfo: state.auth.user as User
})

const mapDispatchToProps: DispatchProps = {
  createNewProject: (projectData: Project) =>
    createNewProjectRequest(projectData),
  getClients: () => getAllClientsRequest()
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
