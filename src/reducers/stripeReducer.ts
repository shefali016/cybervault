import * as ActionTypes from 'actions/actionTypes'
import { createTransform } from 'redux-persist'
import { PaymentMethod } from '@stripe/stripe-js'

export type State = {
  paymentMethods: Array<PaymentMethod>
  customer: any

  detachError: null | string
  detachSuccess: boolean

  attachError: null | string
  attachSuccess: boolean
}

export type Action = {
  type: string
  paymentMethods: Array<PaymentMethod>
  paymentMethod: PaymentMethod
  error: string
}

const initialState = {
  customer: null,
  paymentMethods: [],
  detachError: null,
  detachSuccess: false,

  attachError: null,
  attachSuccess: false
}

const stripe = (state = initialState, action: Action) => {
  switch (action.type) {
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
    paymentMethods: outboundState.paymentMethods.filter((p) => !!p)
  }),
  { whitelist: ['stripe'] }
)

export default stripe
