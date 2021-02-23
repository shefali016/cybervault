import * as ActionTypes from './actionTypes'
import { PaymentMethod } from '@stripe/stripe-js'

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
