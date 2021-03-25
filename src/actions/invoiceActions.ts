import * as ActionTypes from './actionTypes'
import * as Types from '../utils/Interface'

export function generateNewInvoiceRequest(
  account: Types.Account,
  project: Types.Project,
  invoice: Types.Invoice
) {
  return {
    type: ActionTypes.NEW_INVOICE_REQUEST,
    account,
    project,
    invoice
  }
}
export function generateNewInvoiceSuccess(invoice: Types.Invoice) {
  return {
    type: ActionTypes.NEW_INVOICE_SUCCESS,
    payload: invoice
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
    account
  }
}
export function getAllInvoiceSuccess(invoicesData: Array<Types.Invoice>) {
  return {
    type: ActionTypes.GET_ALL_INVOICE_SUCCESS,
    payload: invoicesData
  }
}
export function getAllInvoiceError(error: string) {
  return {
    type: ActionTypes.GET_ALL_INVOICE_ERROR,
    error
  }
}

export function getInvoiceRequest(accountId: string, invoiceId: string) {
  return {
    type: ActionTypes.GET_INVOICE_REQUEST,
    accountId,
    invoiceId
  }
}
export function getInvoiceSuccess(invoicesData: Array<Types.Invoice>) {
  return {
    type: ActionTypes.GET_INVOICE_SUCCESS,
    payload: invoicesData
  }
}
export function getInvoiceError(error: string) {
  return {
    type: ActionTypes.GET_INVOICE_ERROR,
    error
  }
}
export function sendRevisionRequest(
  accountId: string,
  invoiceId: string,
  conversation: Types.InvoiceConversation
) {
  return {
    type: ActionTypes.SEND_REVISION_REQUEST,
    accountId,
    invoiceId,
    conversation
  }
}
export function sendRevisionSuccess() {
  return {
    type: ActionTypes.SEND_REVISION_SUCCESS
  }
}
export function sendRevisionError(error: string) {
  return {
    type: ActionTypes.SEND_REVISION_ERROR,
    error
  }
}

export function getAllInvoiceConversationRequest(
  accountId: string,
  invoiceId: string
) {
  return {
    type: ActionTypes.GET_ALL_INVOICE_CONVERSATION_REQUEST,
    accountId,
    invoiceId
  }
}

export function getAllInvoiceConversationSuccess(data: any) {
  return {
    type: ActionTypes.GET_ALL_INVOICE_CONVERSATION_SUCCESS,
    payload: data
  }
}
export function getAllInvoiceConversationError(error: string) {
  return {
    type: ActionTypes.GET_ALL_INVOICE_CONVERSATION_ERROR,
    error
  }
}

export function payInvoice(
  amount: number,
  tokenId: string,
  invoiceId: string,
  account: string,
  stripeAccountId: string,
  transactionFee: number
) {
  return {
    type: ActionTypes.PAY_INVOICE,
    amount,
    tokenId,
    invoiceId,
    account,
    stripeAccountId,
    transactionFee
  }
}

export function payInvoiceSuccess(invoiceId: string) {
  return {
    type: ActionTypes.PAY_INVOICE_SUCCESS,
    payload: invoiceId
  }
}
export function payInvoiceError(error: string) {
  return {
    type: ActionTypes.PAY_INVOICE_FAILURE,
    error
  }
}
