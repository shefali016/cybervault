import { initFirebase } from './firebaseConfig'
import { Router } from 'react-router-dom'
import Routes from './routes/navigationRoutes'
import history from './services/history'
import React from 'react'
import { StripeProvider } from 'react-stripe-elements'
import { stripe_public_key } from 'config.json'
import ToastHandler from 'components/ToastHandler'

initFirebase()

function App() {
  return (
    <Router history={history}>
      <StripeProvider apiKey={stripe_public_key}>
        <React.Fragment>
          <Routes />
          <ToastHandler />
        </React.Fragment>
      </StripeProvider>
    </Router>
  )
}

export default App
