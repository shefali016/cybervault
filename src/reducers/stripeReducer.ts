import * as ActionTypes from 'actions/actionTypes'
import { createTransform } from 'redux-persist'
import { PaymentMethod } from '@stripe/stripe-js'
import { Invoice, StripePlans, Subscription } from 'utils/Interface'

export type State = {
  paymentMethods: Array<PaymentMethod>
  customer: any
  customerRestored: boolean

  detachError: null | string
  detachSuccess: boolean

  attachError: null | string
  attachSuccess: boolean

  setAsDefaultError: null | string
  setAsDefaultSuccess: boolean

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

  storagePurchaseLoading: boolean
  storagePurchaseSuccess: boolean
  storagePurchaseError: null | string

  billingHistory: Array<Invoice> | null
  billingHistoryLoading: boolean
  billingHistorySuccess: boolean
  billingHistoryError: null | string
}

export type Action = {
  type: string
  paymentMethods: Array<PaymentMethod>
  paymentMethod: PaymentMethod
  error: string
  customer: any
  subscription: Subscription
  subscriptionId: string
  planId: string
  plans: Array<StripePlans>
  storageSubscription: Subscription
  billingHistory: Array<Invoice>
  paymentMethodId: string
}

const initialState = {
  customer: null,
  customerRestored: false,
  paymentMethods: [],
  detachError: null,
  detachSuccess: false,

  setAsDefaultError: null,
  setAsDefaultSuccess: false,

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
  storagePlan: null,

  storagePurchaseLoading: false,
  storagePurchaseSuccess: false,
  storagePurchaseError: null,

  billingHistory: null,
  billingHistoryLoading: false,
  billingHistorySuccess: false,
  billingHistoryError: null
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
      return { ...state, plansLoading: true }
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
        plansLoading: false
      }
    case ActionTypes.GET_PLAN_LIST_FAILURE:
      return { ...state, plansLoading: false }

    case ActionTypes.CREATE_AMOUNT_SUBSCRIPTION:
      return {
        ...state,
        storagePurchaseLoading: true,
        storagePurchaseSuccess: false,
        storagePurchaseError: null
      }
    case ActionTypes.CREATE_AMOUNT_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        storagePurchaseLoading: false,
        storagePurchaseSuccess: true,
        storageSubscription: action.subscription
      }
    case ActionTypes.CREATE_AMOUNT_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        storagePurchaseLoading: false,
        storagePurchaseError: action.error
      }
    case ActionTypes.SET_DEFAULT_PAYMENT_METHOD:
      return {
        ...state,
        billingHistoryLoading: true
      }
    case ActionTypes.SET_DEFAULT_PAYMENT_METHOD_SUCCESS:
      const paymentMethods = state.paymentMethods
      const index = state.paymentMethods.findIndex(
        (item: any) => item.id === action.paymentMethodId
      )
      const defultPaymentMethod = paymentMethods[index]
      paymentMethods.splice(index, 1)
      paymentMethods.push(defultPaymentMethod)

      return {
        ...state,
        customer: action.customer,
        setAsDefaultSuccess: true
      }
    case ActionTypes.SET_DEFAULT_PAYMENT_METHOD_FAILURE:
      return {
        ...state,
        setAsDefaultError: action.error
      }
    case ActionTypes.GET_CUSTOMER_INVOICE:
      return {
        ...state,
        billingHistoryLoading: true
      }
    case ActionTypes.GET_CUSTOMER_INVOICE_SUCCESS:
      return {
        ...state,
        billingHistory: action.billingHistory,
        billingHistoryLoading: false,
        billingHistorySuccess: true
      }
    case ActionTypes.GET_CUSTOMER_INVOICE_FAILURE:
      return {
        ...state,
        billingHistoryError: action.error,
        billingHistoryLoading: false,
        billingHistorySuccess: false
      }

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
    accountSubscription: outboundState.accountSubscription,
    customer: outboundState.customer,
    paymentMethods: outboundState.paymentMethods.filter((p) => !!p)
  }),
  { whitelist: ['stripe'] }
)

export default stripe
