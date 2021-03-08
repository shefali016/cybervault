import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginScreen from '../screens/AuthScreens/LoginScreen'
import SignUpScreen from '../screens/AuthScreens/SignUpScreen'
import MainScreen from 'screens/MainScreen'
import { useGlobalStyles } from '../utils/globalStyles'
import InvoicesClientScreen from '../screens/SharedScreens/InvoicesClientScreen'
import PortfolioSingleScreen from 'screens/DashboardScreens/PortfolioSingleScreen'
import LandingScreen from 'screens/LandingScreen'

type Props = { isLoggedIn?: boolean }

const Routes = (props: Props): JSX.Element => {
  useGlobalStyles()
  return props.isLoggedIn ? MainRoutes() : AuthRoutes()
}

const MainRoutes = () => (
  <Switch>
    <Route path='/' exact component={LandingScreen} />
    <Route path='/portfolio/:id' component={PortfolioSingleScreen} />
    <Route path='/' component={MainScreen} />
  </Switch>
)

const AuthRoutes = () => (
  <Switch>
    <Route path='/' exact component={LandingScreen} />
    <Route path='/signup' component={SignUpScreen} />
    <Route path='/clientInvoices/:accId/:id' component={InvoicesClientScreen} />
    <Route path='/' component={LoginScreen} />
  </Switch>
)

const mapStateToProps = (state: any): Props => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps, null)(Routes)
