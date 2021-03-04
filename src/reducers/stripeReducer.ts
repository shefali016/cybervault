import * as ActionTypes from 'actions/actionTypes'
import { createTransform } from 'redux-persist'
import { PaymentMethod } from '@stripe/stripe-js'

export type State = {
  paymentMethods: Array<PaymentMethod>
  customer: any
  customerRestored: boolean

  detachError: null | string
  detachSuccess: boolean

  attachError: null | string
  attachSuccess: boolean

  subscription: null | Object
  planSubscriptionLoading: boolean

  cancelSubscriptionLoading: boolean

  isSubscriptionChange: boolean
}

export type Action = {
  type: string
  paymentMethods: Array<PaymentMethod>
  paymentMethod: PaymentMethod
  error: string
  customer: any
  subscription: any
  subscriptionId: any
}

const initialState = {
  customer: null,
  customerRestored: false,
  paymentMethods: [],
  detachError: null,
  detachSuccess: false,

  attachError: null,
  attachSuccess: false,

  subscription: null,
  planSubscriptionLoading: false,

  cancelSubscriptionLoading: false,
  isSubscriptionChange: false
}

const stripe = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GET_CUSTOMER_SUCCESS:
      return { ...state, customer: action.customer, customerRestored: true }

    case ActionTypes.GET_PAYMENT_METHODS_SUCCESS:
      return { ...state, paymentMethods: action.paymentMethods }

    case ActionTypes.ATTACH_PAYMENT_METHOD:
      return { ...state, attachSuccess: false, attachError: null }
    case ActionTypes.ATTACH_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        attachSuccess: true,
        paymentMethods: [action.paymentMethod, ...state.paymentMethods]
      }
    case ActionTypes.ATTACH_PAYMENT_METHOD_FAILURE:
      return { ...state, attachError: action.error }

    case ActionTypes.DETACH_PAYMENT_METHOD:
      return { ...state, detachSuccess: true, detachError: null }
    case ActionTypes.DETACH_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        detachSuccess: true,
        paymentMethods: state.paymentMethods.filter(
          (p: PaymentMethod) => p.id !== action.paymentMethod.id
        )
      }
    case ActionTypes.DETACH_PAYMENT_METHOD_FAILURE:
      return { ...state, detachError: action.error }

    case ActionTypes.PLAN_SUBSCRIPTION:
      return { ...state, planSubscriptionLoading: true }
    case ActionTypes.PLAN_SUBSCRIPTION_SUCCESS:
      const customer: any = state.customer
      customer.subscriptions.data.push(action.subscription)
      return {
        ...state,
        subscription: action.subscription,
        planSubscriptionLoading: false,
        customer
      }
    case ActionTypes.PLAN_SUBSCRIPTION_FAILURE:
      return { ...state, planSubscriptionLoading: false }

    case ActionTypes.CANCEL_PLAN_SUBSCRIPTION:
      return { ...state, cancelSubscriptionLoading: true }
    case ActionTypes.CANCEL_PLAN_SUBSCRIPTION_SUCCESS:
      const customerData: any = state.customer
      customerData.subscriptions.data = []
      return {
        ...state,
        customer: customerData,
        cancelSubscriptionLoading: false
      }
    case ActionTypes.CANCEL_PLAN_SUBSCRIPTION_FAILURE:
      return { ...state, cancelSubscriptionLoading: false }
    case ActionTypes.UPDATE_PLAN_SUBSCRIPTION:
      return { ...state, planSubscriptionLoading: true }
    case ActionTypes.UPDATE_PLAN_SUBSCRIPTION_SUCCESS:
      const customerRes: any = state.customer
      customerRes.subscriptions.data[0] = action.subscription
      return {
        ...state,
        subscription: action.subscription,
        planSubscriptionLoading: false,
        customer: customerRes
      }
    case ActionTypes.UPDATE_PLAN_SUBSCRIPTION_FAILURE:
      return { ...state, planSubscriptionLoading: false }

    default:
      return state
  }
}

export const stripeTransform = createTransform(
  (inboundState: State) => {
    return inboundState
  },
  (outboundState: State) => ({
    ...initialState,
    customer: outboundState.customer,
    paymentMethods: outboundState.paymentMethods.filter((p) => !!p)
  }),
  { whitelist: ['stripe'] }
)

export default stripe
