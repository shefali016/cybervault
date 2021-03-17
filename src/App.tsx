import { initFirebase } from './firebaseConfig'
import { Router } from 'react-router-dom'
import Routes from './routes/navigationRoutes'
import history from './services/history'
import React from 'react'
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from '@material-ui/core/styles'
import { ToastProvider } from 'context/Toast'
import AssetUploadProvider from 'context/AssetUpload'
import { StripeProvider } from 'react-stripe-elements'
import { stripe_public_key } from 'config.json'
import ToastHandler from 'components/ToastHandler'

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 770,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    // action: { hoverOpacity: 0.3 },
    primary: { main: '#0773FF', light: '#5ea5fc', dark: '#3462fc' },
    background: {
      default: '#181818',
      secondary: '#202020',
      surface: '#272726',
      surfaceHighlight: '#40403f',
      paper: '#ffffff'
    },
    text: {
      primary: '#24262b',
      secondary: '#e3e3e3',
      background: '#ffffff',
      paper: '#24262b',
      meta: '#999999'
    },
    border: '#e6e6e6',
    status: {
      inProgress: '#ffea00',
      completed: '#4caf50',
      archived: '#f44336'
    }
  },
  shape: { borderRadius: 12 },
  typography: {
    body1: { fontSize: 18 }
  }
})

const responsiveTheme = responsiveFontSizes(theme)

initFirebase()

function App() {
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
export default App
