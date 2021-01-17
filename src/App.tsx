import './App.css'
import { initFirebase } from './firebaseConfig'
import { Router } from 'react-router-dom'
import Routes from './routes/navigationRoutes'
import history from './services/history'
import React from 'react'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from '@material-ui/core/styles'
import { ToastProvider } from 'context/Toast'

const useStyles = makeStyles((theme) => ({
  '@global': {
    '.row': { display: 'flex', alignItems: 'center' },
    '.icon': { color: theme.palette.grey[400], fontSize: 20 },
    '.MuiButton-label': { textTransform: 'capitalize' }
  }
}))

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
    primary: { main: '#0773FF', light: '#5ea5fc', dark: '#3462fc' },
    background: { default: '#181818', secondary: '#202020', paper: '#ffffff' },
    text: {
      primary: '#24262b',
      secondary: '#e6e6e6',
      background: '#ffffff',
      paper: '#24262b',
      meta: '#999999'
    },
    border: '#e6e6e6'
  },
  shape: { borderRadius: 12 }
})

initFirebase()

function App() {
  useStyles()
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Routes />
        </ToastProvider>
      </ThemeProvider>
    </Router>
  )
}
export default App
