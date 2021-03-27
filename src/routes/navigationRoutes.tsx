import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginScreen from '../screens/AuthScreens/LoginScreen'
import SignUpScreen from '../screens/AuthScreens/SignUpScreen'
import MainSwitch from './MainSwitch'
import { GlobalStyles } from '../utils/globalStyles'
import InvoicesClientScreen from '../screens/SharedScreens/InvoicesClientScreen'
import LandingScreen from 'screens/LandingScreens/HomeScreen'
import PricingScreen from 'screens/LandingScreens/PricingScreen'
import PortfolioShareScreen from 'screens/PortfolioShareScreen'
import { createTheme } from 'utils/theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { ColorThemes } from 'utils/enums'
import { ReduxState } from 'reducers/rootReducer'

const Routes = (props: Props): JSX.Element => {
  return (
    <Switch>
      <Route path='/' exact component={LandingRoutes} />
      <Route path='/' component={AppRoutes} />
    </Switch>
  )
}

const LandingRoutes = () => {
  const theme = createTheme(ColorThemes.DARK)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Switch>
        <Route path='/' exact component={LandingScreen} />
        <Route path='/pricing' exact component={PricingScreen} />
      </Switch>
    </ThemeProvider>
  )
}

type Props = { isLoggedIn?: boolean }

const AppRoutes = () => {
  const theme = createTheme(ColorThemes.LIGHT)

  const isLoggedIn = useSelector((state: ReduxState) => state.auth.isLoggedIn)

  const AuthRoutes = isLoggedIn ? LoggedInRoutes() : LoggedOutRoutes()

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Switch>
        <Route
          path='/clientInvoices/:id/:accId/'
          component={InvoicesClientScreen}
        />
        <Route path='/portfolioShare/:id' component={PortfolioShareScreen} />
        {AuthRoutes}
      </Switch>
    </ThemeProvider>
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
