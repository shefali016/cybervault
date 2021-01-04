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
  },
  palette: {
    primary: { main: '#2D7ED4', light: '#58B0FD', dark: '#0852B1' },
    background: { default: '#0F0F0F', paper: '#ffffff' },
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
