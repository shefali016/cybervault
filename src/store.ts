import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from 'reducers/rootReducer'
import rootSagas from 'sagas/rootSaga'
import { authTransform } from './reducers/authReducer'
import { projectTransform } from 'reducers/projectReducer'
import logger from 'redux-logger'

// Create sagas middleware
const sagaMiddleware = createSagaMiddleware()
const middleware: any = [sagaMiddleware]
const composeEnhancers =
  typeof window === 'object' &&
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const persistConfig = {
  key: 'root',
  storage,
  transforms: [authTransform]
}

const persistedReducer = persistReducer(persistConfig, rootReducer as any)

export default function configureStore() {
  const isProd = process.env.NODE_ENV === 'production'
  if (!isProd) {
    middleware.push(logger)
  }
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middleware))
  )
  let persistor = persistStore(store)
  // Running sagas
  sagaMiddleware.run(rootSagas)
  return { store, persistor }
}
