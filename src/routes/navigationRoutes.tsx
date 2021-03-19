import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginScreen from '../screens/AuthScreens/LoginScreen'
import SignUpScreen from '../screens/AuthScreens/SignUpScreen'
import MainSwitch from './MainSwitch'
import { useGlobalStyles } from '../utils/globalStyles'
import InvoicesClientScreen from '../screens/SharedScreens/InvoicesClientScreen'
import LandingScreen from 'screens/LandingScreens/HomeScreen'
import PricingScreen from 'screens/LandingScreens/PricingScreen'
import PortfolioShareScreen from 'screens/PortfolioShareScreen'

type Props = { isLoggedIn?: boolean }

const Routes = (props: Props): JSX.Element => {
  useGlobalStyles()

  const AuthRoutes = props.isLoggedIn ? LoggedInRoutes() : LoggedOutRoutes()

  return (
    <Switch>
      <Route path='/' exact component={LandingScreen} />
      <Route path='/pricing' exact component={PricingScreen} />
      <Route
        path='/clientInvoices/:id/:accId/:customerId'
        component={InvoicesClientScreen}
      />
      <Route path='/portfolioShare/:id' component={PortfolioShareScreen} />
      {AuthRoutes}
    </Switch>
  )
}

const LoggedInRoutes = () => <Route path='/' component={MainSwitch} />

const LoggedOutRoutes = () => (
  <>
    <Route path='/signup' component={SignUpScreen} />
    <Route path='/' component={LoginScreen} />
  </>
)

const mapStateToProps = (state: any): Props => ({
  isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps, null)(Routes)
