import './App.css'
import { initFirebase } from './firebaseConfig'
import { Router } from 'react-router-dom'
import Routes from './routes/navigationRoutes'
import history from './services/history'
import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

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
    background: { default: '#24262B', paper: '#ffffff' },
    text: {
      primary: '#ffffff',
      secondary: '#e6e6e6'
    }
  },
  shape: { borderRadius: 12 }
})

initFirebase()

function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Router>
  )
}
export default App
