import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './index'
import { connect } from 'react-redux'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import HomeScreen from '../screens/HomeScreen'
import ProjectScreen from '../screens/projects/ProjectsScreen'
import EditProjectScreen from '../screens/EditProjectScreen'

type Props = { isLoggedIn?: boolean }

const Routes = (props: Props): JSX.Element => {
  return props.isLoggedIn ? MainRoutes() : AuthRoutes()
}

const MainRoutes = () => (
  <Switch>
    <Route path='/editProjectInfo' component={EditProjectScreen} />
    <Route path='/projects' component={ProjectScreen} />
    <Route path='/' component={HomeScreen} />
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
