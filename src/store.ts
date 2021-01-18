import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from 'reducers/rootReducer'
import rootSagas from 'sagas/rootSaga'
import { authTransform } from './reducers/authReducer'
import { projectTransform } from 'reducers/projectReducer'

// Create sagas middleware
const sagaMiddleware = createSagaMiddleware()
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
  transforms: [authTransform, projectTransform]
}

const persistedReducer = persistReducer(persistConfig, rootReducer as any)

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  )
  let persistor = persistStore(store)
  // Running sagas
  sagaMiddleware.run(rootSagas)
  return { store, persistor }
}
