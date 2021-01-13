import './App.css'
import { initFirebase } from './firebaseConfig'
import { Router } from 'react-router-dom'
import Routes from './routes/navigationRoutes'
import history from './services/history'
import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    status: {
      inProgress: React.CSSProperties['color']
      completed: React.CSSProperties['color']
      archived: React.CSSProperties['color']
    }
  }
  interface ThemeOptions {
    status: {
      inProgress: React.CSSProperties['color']
      completed: React.CSSProperties['color']
      archived: React.CSSProperties['color']
    }
  }
}

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
  status: {
    inProgress: '#ffea00',
    completed: '#4caf50',
    archived: '#f44336'
  },
  palette: {
    primary: { main: '#0773FF', light: '#5ea5fc', dark: '#3462fc' },
    background: { default: '#24262b', secondary: '#292b2e', paper: '#ffffff' },
    text: {
      primary: '#ffffff',
      secondary: '#e6e6e6',
      background: '#ffffff'
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
