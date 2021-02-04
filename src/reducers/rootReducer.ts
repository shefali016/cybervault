import { CombinedState, combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import projectReducer from './projectReducer'
import clientReducer from './clientReducer'
import { State as AuthState, Action as AuthAction } from './authReducer'
import {
  State as ProjectState,
  Action as ProjectAction,
} from './projectReducer'
import {
  State as ClientsState,
  Action as ClientsActions,
} from './clientReducer'

import {

  State as PorfolioState,
  Action as PortfolioAction
} from './portfoliosReducer'
import portfoliosReducer from './portfoliosReducer'

const appReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  clients:clientReducer,
  portfolio: portfoliosReducer
})

export type ReduxState = {
  auth: AuthState
  project: ProjectState
  portfolio: PorfolioState
  clients:ClientsState
}

export type Action = AuthAction & ProjectAction & PortfolioAction & ClientsActions

const rootReducer = (state: CombinedState<ReduxState>, action: Action) => {
  if (action.type === 'RESET_ALL_DATA') {
    state = {
      auth: state.auth,
      project: state.project,
      clients:state.clients,
      portfolio: state.portfolio
    }
  }
  return appReducer(state as any, action)
}

export default rootReducer
