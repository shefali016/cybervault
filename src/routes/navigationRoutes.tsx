import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginScreen from '../screens/AuthScreens/LoginScreen'
import SignUpScreen from '../screens/AuthScreens/SignUpScreen'
import MainScreen from 'screens/MainScreen'
import { useGlobalStyles } from '../utils/globalStyles'
import InvoicesClientScreen from '../screens/SharedScreens/InvoicesClientScreen'
import PortfolioSingleScreen from 'screens/DashboardScreens/PortfolioSingleScreen'
import LandingScreen from 'screens/LandingScreens/HomeScreen'
import PricingScreen from 'screens/LandingScreens/PricingScreen'
import PortfolioShareScreen from 'screens/PortfolioShareScreen'

type Props = { isLoggedIn?: boolean }

const Routes = (props: Props): JSX.Element => {
  useGlobalStyles()

  const AuthSwitch = props.isLoggedIn ? MainRoutes() : AuthRoutes()

  return (
    <Switch>
      <Route path='/' exact component={LandingScreen} />
      <Route path='/pricing' exact component={PricingScreen} />
      <Route
        path='/clientInvoices/:accId/:id'
        component={InvoicesClientScreen}
      />
      <Route path='/portfolioShare/:id' component={PortfolioShareScreen} />
      {AuthSwitch}
    </Switch>
  )
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
