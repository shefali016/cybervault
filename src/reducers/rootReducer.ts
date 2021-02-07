import { CombinedState, combineReducers } from 'redux'
import authReducer from './authReducer'
import { State as AuthState, Action as AuthAction } from './authReducer'
import { State as Invoicestate, Action as InvoiceAction } from './invoiceReducer'
import invoiceReducer from './invoiceReducer'
import {
  State as ProjectState,
  Action as ProjectAction
} from './projectReducer'
import projectReducer from './projectReducer'
import {
  State as PorfolioState,
  Action as PortfolioAction
} from './portfoliosReducer'
import portfoliosReducer from './portfoliosReducer'

const appReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  invoice:invoiceReducer,
  portfolio: portfoliosReducer

})

export type ReduxState = {
  auth: AuthState
  project: ProjectState,
  invoice:Invoicestate,
  portfolio: PorfolioState
}

export type Action = AuthAction & ProjectAction &InvoiceAction & PortfolioAction

const rootReducer = (state: CombinedState<ReduxState>, action: Action) => {
  if (action.type === 'RESET_ALL_DATA') {
    state = {
      auth: state.auth,
      project: state.project,
      invoice:state.invoice,
      portfolio: state.portfolio
    }
  }
  return appReducer(state as any, action)
}

export default rootReducer
