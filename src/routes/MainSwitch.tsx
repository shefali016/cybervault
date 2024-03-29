import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Project, User, Account, Subscription } from 'utils/Interface'

import { createNewProjectRequest } from 'actions/projectActions'
import { getUser } from 'actions/user'
import { getAccount } from 'actions/account'
import { ReduxState } from 'reducers/rootReducer'
import { getCustomer } from 'actions/stripeActions'
import { FullScreenLoader } from 'components/Common/Loading/FullScreenLoader'
import Dashboard from './DashboardSwitch'
import PortfolioSingleScreen from 'screens/DashboardScreens/PortfolioSingleScreen'
import ProjectSingleScreen from 'screens/DashboardScreens/ProjectSingleScreen'
import InvoiceSingleScreen from 'screens/SharedScreens/InvoiceSingleScreen'
import { getUsedStorage } from 'actions/account'
import { getAllClientsRequest } from 'actions/clientActions'
import { getAllProjects } from 'actions/projectActions'
import { requestGetNotifications } from 'actions/notification'

type DispatchProps = {
  createNewProject: (project: Project) => void
  getUser: (id: string) => void
  getAccount: (id: string) => void
  getCustomer: () => void
  getStorage: () => void
  getClients: () => void
  getProjects: () => void
  getNotifications: () => void
}
type StateProps = {
  userRestored: boolean
  accountRestored: boolean
  customerRestored: boolean
  user: User
  account: Account
  allProjectsData: Array<Project>
  accountSubscription: Subscription
}
type Props = { history: any; location: any } & StateProps & DispatchProps

const MainSwitch = ({
  userRestored,
  accountRestored,
  customerRestored,
  getUser,
  getAccount,
  getCustomer,
  getStorage,
  user,
  account,
  getClients,
  getProjects,
  getNotifications
}: Props) => {
  useEffect(() => {
    if (!userRestored) {
      getUser(user.id)
    }
    if (!accountRestored) {
      getAccount(account.id)
    }
    if (!customerRestored) {
      getCustomer()
    }
    getStorage()
    getClients()
    getProjects()
    getNotifications()
  }, [])

  if (!(userRestored && accountRestored && customerRestored)) {
    return <FullScreenLoader />
  }

  return (
    <Switch>
      <Route path='/portfolio/:id' component={PortfolioSingleScreen} />
      <Route path='/project/:id' component={ProjectSingleScreen} />
      <Route path='/invoice/:id/:accId' component={InvoiceSingleScreen} />
      <Route path='/' component={Dashboard} />
    </Switch>
  )
}

const mapStateToProps = (state: ReduxState): StateProps => ({
  accountRestored: state.auth.accountRestored,
  userRestored: state.auth.userRestored,
  customerRestored: state.stripe.customerRestored,
  user: state.auth.user as User,
  account: state.auth.account as Account,
  allProjectsData: state.project.allProjectsData as Array<Project>,
  accountSubscription: state.stripe.accountSubscription as Subscription
})

const mapDispatchToProps: DispatchProps = {
  createNewProject: (projectData: Project) =>
    createNewProjectRequest(projectData),
  getUser: (id: string) => getUser(id),
  getAccount: (id: string) => getAccount(id),
  getCustomer: () => getCustomer(),
  getStorage: () => getUsedStorage(),
  getClients: () => getAllClientsRequest(),
  getProjects: () => getAllProjects(),
  getNotifications: () => requestGetNotifications()
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSwitch)
