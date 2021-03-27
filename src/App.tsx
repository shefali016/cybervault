import { initFirebase } from './firebaseConfig'
import { Router } from 'react-router-dom'
import Routes from './routes/navigationRoutes'
import history from './services/history'
import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { ToastProvider } from 'context/Toast'
import AssetUploadProvider from 'context/AssetUpload'
import { StripeProvider } from 'react-stripe-elements'
import { stripe_public_key } from 'config.json'
import ToastHandler from 'components/ToastHandler'
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { ColorThemes } from 'utils/enums'
import { createTheme } from 'utils/theme'

initFirebase()

type Props = { colorTheme: ColorThemes }

function App({ colorTheme }: Props) {
  const responsiveTheme = createTheme(colorTheme)
  return (
    <Router history={history}>
      <StripeProvider apiKey={stripe_public_key}>
        <ThemeProvider theme={responsiveTheme}>
          <ToastProvider>
            <AssetUploadProvider>
              <React.Fragment>
                <Routes />
                <ToastHandler />
              </React.Fragment>
            </AssetUploadProvider>
          </ToastProvider>
        </ThemeProvider>
      </StripeProvider>
    </Router>
  )
}

const mapState = (state: ReduxState) => ({ colorTheme: state.theme.colorTheme })

export default connect(mapState)(App)
