import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import configureStore from './store'
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore()
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.Fragment>
        <App />
      </React.Fragment>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
