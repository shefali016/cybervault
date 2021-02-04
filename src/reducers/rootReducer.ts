import { CombinedState, combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { State as AuthState, Action as AuthAction } from './authReducer'
import {
  State as ProjectState,
  Action as ProjectAction
} from './projectReducer'
import {
  State as PorfolioState,
  Action as PortfolioAction
} from './portfoliosReducer'
import portfoliosReducer from './portfoliosReducer'

const appReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  portfolio: portfoliosReducer
})

export type ReduxState = {
  auth: AuthState
  project: ProjectState
  portfolio: PorfolioState
}

export type Action = AuthAction & ProjectAction & PortfolioAction

const rootReducer = (state: CombinedState<ReduxState>, action: Action) => {
  if (action.type === 'RESET_ALL_DATA') {
    state = {
      auth: state.auth,
      project: state.project,
      portfolio: state.portfolio
    }
  }
  return appReducer(state as any, action)
}

export default rootReducer
