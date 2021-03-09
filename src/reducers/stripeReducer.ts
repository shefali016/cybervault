import * as ActionTypes from 'actions/actionTypes'
import { createTransform } from 'redux-persist'
import { PaymentMethod } from '@stripe/stripe-js'
import { StripePlans } from 'utils/Interface'

export type State = {
  paymentMethods: Array<PaymentMethod>
  customer: any
  customerRestored: boolean

  detachError: null | string
  detachSuccess: boolean

  attachError: null | string
  attachSuccess: boolean

  accountSubscription: null | Object | any
  storageSubscription: null | Object | any
  subscriptionLoading: boolean

  planSubscriptionError: null | string
  planSubscriptionSuccess: boolean

  cancelSubscriptionError: null | string
  cancelSubscriptionSuccess: boolean

  updateSubscriptionSuccess: boolean
  updateSubscriptionError: null | string

  subscriptionPlans: Array<StripePlans> | null
  storagePlan: StripePlans | null
}

export type Action = {
  type: string
  paymentMethods: Array<PaymentMethod>
  paymentMethod: PaymentMethod
  error: string
  customer: any
  subscription: any
  subscriptionId: any
  planId: string
  plans: Array<StripePlans>
}

const initialState = {
  customer: null,
  customerRestored: false,
  paymentMethods: [],
  detachError: null,
  detachSuccess: false,

  attachError: null,
  attachSuccess: false,

  accountSubscription: null,
  storageSubscription: null,
  subscriptionLoading: false,

  planSubscriptionError: null,
  planSubscriptionSuccess: false,

  updateSubscriptionSuccess: false,
  updateSubscriptionError: null,

  cancelSubscriptionError: null,
  cancelSubscriptionSuccess: false,

  subscriptionPlans: null,
  storagePlan: null
}

const stripe = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GET_CUSTOMER_SUCCESS:
      const { subscriptions } = action.customer
      const { data } = subscriptions
      const accountSubscription =
        data && data.length
          ? data[0].metadata.type !== 'storage'
            ? data[0]
            : data[1]
          : null
      const storageSubscription =
        data && data.length
          ? data[0].metadata.type === 'storage'
            ? data[0]
            : data[1]
          : null
      return {
        ...state,
        customer: action.customer,
        accountSubscription,
        storageSubscription,
        customerRestored: true
      }

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

    case ActionTypes.GET_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscription: action.subscription
      }

    case ActionTypes.PLAN_SUBSCRIPTION:
      return {
        ...state,
        subscriptionLoading: true,
        planSubscriptionSuccess: false,
        planSubscriptionError: null
      }
    case ActionTypes.PLAN_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        accountSubscription: action.subscription,
        subscriptionLoading: false,
        planSubscriptionSuccess: true
      }
    case ActionTypes.PLAN_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        subscriptionLoading: false,
        planSubscriptionError: action.error
      }

    case ActionTypes.CANCEL_PLAN_SUBSCRIPTION:
      return {
        ...state,
        subscriptionLoading: true,
        cancelSubscriptionSuccess: false,
        cancelSubscriptionError: null
      }
    case ActionTypes.CANCEL_PLAN_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        accountSubscription: action.subscription,
        subscriptionLoading: false,
        cancelSubscriptionSuccess: true
      }
    case ActionTypes.CANCEL_PLAN_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        subscriptionLoading: false,
        cancelSubscriptionError: action.error
      }
    case ActionTypes.UPDATE_PLAN_SUBSCRIPTION:
      return {
        ...state,
        subscriptionLoading: true,
        updateSubscriptionSuccess: false,
        updateSubscriptionError: null
      }
    case ActionTypes.UPDATE_PLAN_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        accountSubscription: action.subscription,
        subscriptionLoading: false,
        updateSubscriptionSuccess: true
      }
    case ActionTypes.UPDATE_PLAN_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        subscriptionLoading: false,
        updateSubscriptionError: action.error
      }
    case ActionTypes.GET_PLAN_LIST:
      return { ...state, planSubscriptionLoading: true }
    case ActionTypes.GET_PLAN_LIST_SUCCESS:
      const storagePlan = action.plans.filter(
        (plans: StripePlans) => plans.nickname === 'Storage Plan'
      )[0]
      const subscriptionPlans = action.plans.filter(
        (plans: StripePlans) => plans.nickname !== 'Storage Plan'
      )
      return {
        ...state,
        storagePlan,
        subscriptionPlans,
        planSubscriptionLoading: false
      }
    case ActionTypes.GET_PLAN_LIST_FAILURE:
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
    // customer: outboundState.customer,
    paymentMethods: outboundState.paymentMethods.filter((p) => !!p)
  }),
  { whitelist: ['stripe'] }
)

export default stripe
