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
import { ReduxState } from 'reducers/rootReducer'
import { connect } from 'react-redux'
import { ColorThemes } from 'utils/enums'

const darkPalette = {
  // action: { hoverOpacity: 0.3 },
  primary: { main: '#0773FF', light: '#5ea5fc', dark: '#3462fc' },
  background: {
    shadow: '#101010',
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
    meta: '#A3A5A9'
  },
  border: '#e6e6e6',
  status: {
    inProgress: '#ffea00',
    completed: '#4caf50',
    archived: '#f44336'
  }
}

const lightPalette = {
  // action: { hoverOpacity: 0.3 },
  primary: { main: '#0773FF', light: '#5ea5fc', dark: '#3462fc' },
  background: {
    shadow: '#CCCCCC',
    default: '#F9F9F8',
    secondary: '#FFFFFF',
    surface: '#F2F2F2',
    surfaceHighlight: '#E5E5E5',
    paper: '#ffffff'
  },
  text: {
    primary: '#030302',
    secondary: '#606060',
    background: '#030302',
    paper: '#030302',
    meta: '#606060'
  },
  border: '#e6e6e6',
  status: {
    inProgress: '#ffea00',
    completed: '#4caf50',
    archived: '#f44336'
  }
}

const createTheme = (colorTheme: ColorThemes) =>
  createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 500,
        md: 770,
        lg: 1280,
        xl: 1920
      }
    },
    palette: colorTheme === ColorThemes.DARK ? darkPalette : lightPalette,
    shape: { borderRadius: 12 },
    typography: {
      body1: { fontSize: 18 },
      caption: { fontSize: 13 }
    }
  })

initFirebase()

type Props = { colorTheme: ColorThemes }

function App({ colorTheme }: Props) {
  const responsiveTheme = responsiveFontSizes(createTheme(colorTheme))
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
