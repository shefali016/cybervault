import * as ActionTypes from './actionTypes'
import * as Types from '../utils/Interface' 

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
 
  export function getAllInvoiceRequest(account: Types.Account) {
    return {
      type: ActionTypes.GET_ALL_INVOICE_REQUEST,
      account,
    }
  }
  export function getAllInvoiceSuccess(
    invoicesData:Array<Types.Invoice>
  ) {
    return {
      type: ActionTypes.GET_ALL_INVOICE_SUCCESS,
      payload:invoicesData
    }
  }
  export function getAllInvoiceError(error: string) {
    return {
      type: ActionTypes.GET_ALL_INVOICE_ERROR,
      error
    }
  }


  export function getInvoiceRequest(account: Types.Account,invoiceId:string) {
    console.log(account,"acccccount")
    return {
      type: ActionTypes.GET_INVOICE_REQUEST,
      account,
      invoiceId
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
  
  
  