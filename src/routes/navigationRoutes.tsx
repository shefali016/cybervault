import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginScreen from '../screens/AuthScreens/LoginScreen'
import SignUpScreen from '../screens/AuthScreens/SignUpScreen'
import MainScreen from 'screens/MainScreen'
import { useGlobalStyles } from '../utils/globalStyles'
import InvoicesClientScreen from '../screens/SharedScreens/InvoicesClientScreen'

type Props = { isLoggedIn?: boolean }

const Routes = (props: Props): JSX.Element => {
  useGlobalStyles()
  return props.isLoggedIn ? MainRoutes() : AuthRoutes()
}

const MainRoutes = () => (
  <Switch>
    <Route path='/' component={MainScreen} />
  </Switch>
)

const AuthRoutes = () => (
  <Switch>
    <Route path='/signup' component={SignUpScreen} />
    <Route exact path='/' component={LoginScreen} />
    <Route path='/clientInvoices/:accId/:id' component={InvoicesClientScreen} /> 
  </Switch>
)

const mapStateToProps = (state: any): Props => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps, null)(Routes)
