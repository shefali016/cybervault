import * as ActionTypes from './actionTypes'
import * as Types from '../utils/types' 

export function generateNewInvoiceRequest(
  account: Types.Account,
    project:Types.Project,
    invoice:Types.Invoice
  ) {
    return {
      type: ActionTypes.NEW_INVOICE_REQUEST,
      account,
      project,
      invoice
    }
  }
  export function generateNewInvoiceSuccess(
    invoice:Types.Invoice
  ) {
    return {
      type: ActionTypes.NEW_INVOICE_SUCCESS,
      payload:invoice
    }
  }
  export function generateNewInvoiceError(error: string) {
    return {
      type: ActionTypes.NEW_INVOICE_ERROR,
      error
    }
  }
 
  export function getInvoiceRequest(account: Types.Account) {
    return {
      type: ActionTypes.GET_INVOICE_REQUEST,
      account,
    }
  }
  export function getInvoiceSuccess(
    invoicesData:Array<Types.Invoice>
  ) {
    return {
      type: ActionTypes.GET_INVOICE_SUCCESS,
      payload:invoicesData
    }
  }
  export function getInvoiceError(error: string) {
    return {
      type: ActionTypes.GET_INVOICE_ERROR,
      error
    }
  }
  
  
  