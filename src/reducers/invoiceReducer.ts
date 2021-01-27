import {
  NEW_INVOICE_REQUEST,
  NEW_INVOICE_SUCCESS,
  NEW_INVOICE_ERROR,
  RESET_INVOICE,
  GET_INVOICE_REQUEST,
  GET_INVOICE_ERROR,
  GET_INVOICE_SUCCESS
} from 'actions/actionTypes'
import { createTransform } from 'redux-persist'
import { getProductData } from 'utils'
import * as Types from '../utils/types'

export type State = {
  Loading: Boolean
  Error: Boolean
  Success: Boolean
  invoiceData: any
  allInvoicesData: any
  getInvoiceLoading: Boolean
  getInvoiceSuccess: Boolean
  getInvoicesError: Boolean
}

export type Action = {
  type: string
  payload: {}
}

const initialState = {
  Loading: false,
  Success: false,
  Error: false,
  invoiceData: {},
  allInvoicesData: {},
  getInvoiceLoading: false,
  getInvoiceSuccess: false,
  getInvoicesError: false
}

const generateNewInvoiceRequest = (state: State, action: Action) => ({
  ...state,
  Loading: true,
  Success: false,
  Error: false,
  invoiceData: {}
})
const generateNewInvoiceError = (state: State, action: Action) => ({
  ...state,
  Loading: false,
  Success: false,
  Error: true,
  invoiceData: {}
})
const generateNewInvoiceSuccess = (state: State, action: Action) => ({
  ...state,
  Loading: false,
  Success: true,
  Error: false,
  invoiceData: action.payload
})
const resetInvoice = (state: State, action: Action) => ({
  ...state,
  Loading: false,
  Success: false,
  Error: false,
  invoiceData: {}
})
const getInvoiceRequest = (state: State, action: Action) => ({
  ...state,
  getInvoiceLoading: true,
  getInvoiceSuccess: false,
  getInvoiceError: false,
  allInvoicesData: {}
})
const getInvoiceError = (state: State, action: Action) => ({
  ...state,
  getInvoiceLoading: false,
  getInvoiceSuccess: false,
  getInvoiceError: true,
  allInvoicesData: {}
})
const getInvoiceSuccess = (state: State, action: Action) => ({
  ...state,
  getInvoiceLoading: false,
  getInvoiceSuccess: true,
  getInvoiceError: false,
  allInvoicesData: action.payload
})
const projectReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case NEW_INVOICE_REQUEST:
      return generateNewInvoiceRequest(state, action)
    case NEW_INVOICE_SUCCESS:
      return generateNewInvoiceSuccess(state, action)
    case NEW_INVOICE_ERROR:
      return generateNewInvoiceError(state, action)
    case RESET_INVOICE:
      return resetInvoice(state, action)
    case GET_INVOICE_REQUEST:
      return getInvoiceRequest(state, action)
    case GET_INVOICE_SUCCESS:
      return getInvoiceSuccess(state, action)
    case GET_INVOICE_ERROR:
      return getInvoiceError(state, action)
    default:
      return state
  }
}

// export const projectTransform = createTransform(
//   (inboundState: State) => {
//     return {
//       ...inboundState,
//       Error:false,
//       Success:false,
//       invoiceData:{}
//     }
//   },
//   (outboundState: State) => outboundState,
//   { whitelist: ['invoice'] }
// )

export default projectReducer
