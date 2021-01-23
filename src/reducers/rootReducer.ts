import { CombinedState, combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { State as AuthState, Action as AuthAction } from './authReducer'
import { State as Invoicestate, Action as InvoiceAction } from './invoiceReducer'
import {
  State as ProjectState,
  Action as ProjectAction
} from './projectReducer';
import invoiceReducer from './invoiceReducer'

const appReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  invoice:invoiceReducer
})

export type ReduxState = {
  auth: AuthState
  project: ProjectState,
  invoice:Invoicestate
}

export type Action = AuthAction & ProjectAction &InvoiceAction

const rootReducer = (state: CombinedState<ReduxState>, action: Action) => {
  if (action.type === 'RESET_ALL_DATA') {
    state = {
      auth: state.auth,
      project: state.project,
      invoice:state.invoice
    }
  }
  return appReducer(state as any, action)
}

export default rootReducer
