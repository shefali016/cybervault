import { CombinedState, combineReducers } from 'redux'
import auth, { State as AuthState, Action as AuthAction } from './authReducer'
import clients, {
  State as ClientsState,
  Action as ClientsActions
} from './clientReducer'
import invoice, {
  State as Invoicestate,
  Action as InvoiceAction
} from './invoiceReducer'
import project, {
  State as ProjectState,
  Action as ProjectAction
} from './projectReducer'
import portfolio, {
  State as PorfolioState,
  Action as PortfolioAction
} from './portfoliosReducer'
import stripe, {
  State as StripeState,
  Action as StripeAction
} from './stripeReducer'

const appReducer = combineReducers({
  auth,
  project,
  invoice,
  clients,
  portfolio,
  stripe
})

export type ReduxState = {
  auth: AuthState
  project: ProjectState
  invoice: Invoicestate
  portfolio: PorfolioState
  clients: ClientsState
  stripe: StripeState
}

export type Action = AuthAction &
  ProjectAction &
  InvoiceAction &
  PortfolioAction &
  ClientsActions &
  StripeAction

const rootReducer = (state: CombinedState<ReduxState>, action: Action) => {
  if (action.type === 'RESET_ALL_DATA') {
    state = {
      auth: state.auth,
      project: state.project,
      invoice: state.invoice,
      clients: state.clients,
      portfolio: state.portfolio,
      stripe: state.stripe
    }
  }
  return appReducer(state as any, action)
}

export default rootReducer
