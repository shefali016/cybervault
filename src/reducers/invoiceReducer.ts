import {
    NEW_INVOICE_REQUEST,
    NEW_INVOICE_SUCCESS,
    NEW_INVOICE_ERROR
  } from 'actions/actionTypes'
  import { createTransform } from 'redux-persist'
  import { getProductData } from 'utils'
  import * as Types from '../utils/types'
  
  export type State = {
    Loading:Boolean,
    Error:Boolean,
    Success:Boolean,
    invoiceData:any
  }
  
  export type Action = {
    type: string
    payload: {}
  }
  
  const initialState = {
    Loading:false,
    Success:false,
    Error:false,
    invoiceData:{}
  }
  
  const generateNewInvoiceRequest = (state: State, action: Action) => ({
    ...state,
    Loading:true,
    Success:false,
    Error:false,
    invoiceData:{}
  })
  const generateNewInvoiceError = (state: State, action: Action) => ({
    ...state,
    Loading:false,
    Success:false,
    Error:true,
    invoiceData:{}
  })
  const generateNewInvoiceSuccess = (state: State, action: Action) => ({
    ...state,
    Loading:false,
    Success:true,
    Error:false,
    invoiceData:action.payload
  })
  const projectReducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case NEW_INVOICE_REQUEST:
        return generateNewInvoiceRequest(state, action)
      case NEW_INVOICE_SUCCESS:
        return generateNewInvoiceSuccess(state, action)
      case NEW_INVOICE_ERROR:
        return generateNewInvoiceError(state, action)
      default:
        return state
    }
  }
  
  export const projectTransform = createTransform(
    (inboundState: State) => {
      return {
        ...inboundState,
        Error:false,
        Success:false,
        invoiceData:{}
      }
    },
    (outboundState: State) => outboundState,
    { whitelist: ['invoice'] }
  )
  
  export default projectReducer
  