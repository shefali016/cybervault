import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginScreen from '../screens/AuthScreens/LoginScreen'
import SignUpScreen from '../screens/AuthScreens/SignUpScreen'
import MainScreen from 'screens/MainScreen'
import { useGlobalStyles } from '../utils/globalStyles'
import PortfolioSingleScreen from 'screens/DashboardScreens/PortfolioSingleScreen'

type Props = { isLoggedIn?: boolean }

const Routes = (props: Props): JSX.Element => {
  useGlobalStyles()
  return props.isLoggedIn ? MainRoutes() : AuthRoutes()
}

const MainRoutes = () => (
  <Switch>
    <Route path='/portfolio/:id' component={PortfolioSingleScreen} />
    <Route path='/' component={MainScreen} />
  </Switch>
)

const AuthRoutes = () => (
  <Switch>
    <Route path='/signup' component={SignUpScreen} />
    <Route path='/' component={LoginScreen} />
  </Switch>
)

const mapStateToProps = (state: any): Props => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps, null)(Routes)
