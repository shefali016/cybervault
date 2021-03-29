import { CombinedState, combineReducers } from 'redux'
import auth, { State as AuthState, Action as AuthAction } from './authReducer'
import clients, {
  State as ClientsState,
  Action as ClientsActions
} from './clientReducer'
import invoice, {
  State as InvoiceState,
  Action as InvoiceAction
} from './invoiceReducer'
import project, {
  State as ProjectState,
  Action as ProjectAction
} from './projectReducer'
import portfolio, {
  State as PortfolioState,
  Action as PortfolioAction
} from './portfoliosReducer'
import stripe, {
  State as StripeState,
  Action as StripeAction
} from './stripeReducer'
import mail, { State as MailState, Action as MailActions } from './mailReducer'
import theme, {
  State as ThemeState,
  Action as ThemeActions
} from './themeReducer'
import notification, { State as NotificationState } from './notifications'
import { Action as NotificationActions } from 'actions/notification'

const appReducer = combineReducers({
  auth,
  project,
  invoice,
  clients,
  portfolio,
  stripe,
  mail,
  theme,
  notification
})

export type ReduxState = {
  auth: AuthState
  project: ProjectState
  invoice: InvoiceState
  portfolio: PortfolioState
  clients: ClientsState
  mail: MailState
  stripe: StripeState
  theme: ThemeState
  notification: NotificationState
}

export type Action = AuthAction &
  ProjectAction &
  InvoiceAction &
  PortfolioAction &
  ClientsActions &
  StripeAction &
  MailActions &
  ThemeActions &
  NotificationActions

const rootReducer = (state: CombinedState<ReduxState>, action: Action) => {
  return appReducer(state as any, action)
}

export default rootReducer
