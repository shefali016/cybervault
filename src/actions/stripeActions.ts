import * as ActionTypes from './actionTypes'
import { PaymentMethod } from '@stripe/stripe-js'
import { Subscription, SubscriptionType } from 'utils/Interface'

export const requestPaymentMethods = (customerId: string) => ({
  type: ActionTypes.GET_PAYMENT_METHODS,
  customerId
})

export const requestPaymentMethodsSuccess = (
  paymentMethods: Array<PaymentMethod>
) => ({ type: ActionTypes.GET_PAYMENT_METHODS_SUCCESS, paymentMethods })

export const requestPaymentMethodsError = (error: string) => ({
  type: ActionTypes.GET_PAYMENT_METHODS_FAILURE,
  error
})

export const attachPaymentMethod = (paymentMethod: PaymentMethod) => ({
  type: ActionTypes.ATTACH_PAYMENT_METHOD,
  paymentMethod
})
export const attachPaymentMethodSuccess = (paymentMethod: PaymentMethod) => ({
  type: ActionTypes.ATTACH_PAYMENT_METHOD_SUCCESS,
  paymentMethod
})
export const attachPaymentMethodFailure = (error: any) => ({
  type: ActionTypes.ATTACH_PAYMENT_METHOD_FAILURE,
  error
})

export const detachPaymentMethod = (paymentMethod: PaymentMethod) => ({
  type: ActionTypes.DETACH_PAYMENT_METHOD,
  paymentMethod
})
export const detachPaymentMethodSuccess = (paymentMethod: PaymentMethod) => ({
  type: ActionTypes.DETACH_PAYMENT_METHOD_SUCCESS,
  paymentMethod
})
export const detachPaymentMethodFailure = (error: any) => ({
  type: ActionTypes.DETACH_PAYMENT_METHOD_FAILURE,
  error
})

export const getCustomer = () => ({ type: ActionTypes.GET_CUSTOMER })
export const getCustomerSuccess = (customer: any) => ({
  type: ActionTypes.GET_CUSTOMER_SUCCESS,
  customer
})
export const getCustomerFailure = (error: any) => ({
  type: ActionTypes.GET_CUSTOMER_FAILURE,
  error
})
export const planSubscription = (
  planId: string,
  paymentMethodId: string,
  subscriptionType: SubscriptionType
) => ({
  type: ActionTypes.PLAN_SUBSCRIPTION,
  planId,
  paymentMethodId,
  subscriptionType
})
export const planSubscriptionSuccess = (subscription: any) => ({
  type: ActionTypes.PLAN_SUBSCRIPTION_SUCCESS,
  subscription
})
export const planSubscriptionFailure = (error: any) => ({
  type: ActionTypes.PLAN_SUBSCRIPTION_FAILURE,
  error
})

export const cancelPlanSubscription = (subscriptionId: string) => ({
  type: ActionTypes.CANCEL_PLAN_SUBSCRIPTION,
  subscriptionId
})
export const cancelPlanSubscriptionSuccess = (subscription: any) => ({
  type: ActionTypes.CANCEL_PLAN_SUBSCRIPTION_SUCCESS,
  subscription
})
export const cancelPlanSubscriptionFailure = (error: any) => ({
  type: ActionTypes.CANCEL_PLAN_SUBSCRIPTION_FAILURE,
  error
})

export const updatePlanSubscription = (
  subscriptionId: string,
  planId: string,
  subscriptionType: SubscriptionType
) => ({
  type: ActionTypes.UPDATE_PLAN_SUBSCRIPTION,
  subscriptionId,
  planId,
  subscriptionType
})
export const updatePlanSubscriptionSuccess = (subscription: Subscription) => ({
  type: ActionTypes.UPDATE_PLAN_SUBSCRIPTION_SUCCESS,
  subscription
})
export const updatePlanSubscriptionFailure = (error: any) => ({
  type: ActionTypes.UPDATE_PLAN_SUBSCRIPTION_FAILURE,
  error
})
