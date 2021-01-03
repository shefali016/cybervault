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
      sm: 770,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }
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
