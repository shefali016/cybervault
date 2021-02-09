import { CombinedState, combineReducers } from 'redux'
import authReducer from './authReducer'
import clientReducer from './clientReducer'
import { State as AuthState, Action as AuthAction } from './authReducer'
import { State as Invoicestate, Action as InvoiceAction } from './invoiceReducer'
import invoiceReducer from './invoiceReducer';
import mailReducer from './mailReducer';

import {
  State as ProjectState,
  Action as ProjectAction
} from './projectReducer'
import projectReducer from './projectReducer'
import {
  State as ClientsState,
  Action as ClientsActions,
} from './clientReducer'
import {
  State as mailState,
  Action as mailActions,
} from './mailReducer'

import {

  State as PorfolioState,
  Action as PortfolioAction
} from './portfoliosReducer'
import portfoliosReducer from './portfoliosReducer'

const appReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  invoice:invoiceReducer,
  clients:clientReducer,
  portfolio: portfoliosReducer,
  mail:mailReducer
})

export type ReduxState = {
  auth: AuthState
  project: ProjectState,
  invoice:Invoicestate,
  portfolio: PorfolioState,
  clients:ClientsState,
  mail:mailState
}

export type Action = AuthAction & ProjectAction &InvoiceAction & PortfolioAction & ClientsActions & mailActions

const rootReducer = (state: CombinedState<ReduxState>, action: Action) => {
  if (action.type === 'RESET_ALL_DATA') {
    state = {
      auth: state.auth,
      project: state.project,
      invoice:state.invoice,
      clients:state.clients,
      portfolio: state.portfolio,
      mail:state.mail
    }
  }
  return appReducer(state as any, action)
}

export default rootReducer
