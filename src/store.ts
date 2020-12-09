import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import persistState from 'redux-localstorage'
import rootReducer from 'reducers/rootReducer'
import rootSagas from 'sagas/rootSaga'

// Create sagas middleware
const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = ((window as any).window.__REDUX_DEVTOOLS_EXTENSION__ && (window as any).window.__REDUX_DEVTOOLS_EXTENSION__({
	trace: true,
	traceLimit: 100
})) || compose

export default function configureStore() {
  const store = createStore(rootReducer as any, composeEnhancers(applyMiddleware(
    sagaMiddleware
  ), persistState('auth' as any)))
  // Running sagas
  sagaMiddleware.run(rootSagas)
  return store
}
