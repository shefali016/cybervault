import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionTypes from '../actions/actionTypes'
import * as InvoiceApis from '../apis/invoiceApi'
import * as InvoiceActions from '../actions/invoiceActions'
import {getAllProjectsRequest} from '../actions/projectActions'
import { Account ,Project,Invoice,userConversation} from '../utils/Interface'


type Params = { account: Account; project:Project,invoice:Invoice; type: string,invoiceId:string,conversation:userConversation }

function* invoiceRequest({ account,project,invoice}: Params) {
  try {
    const invoiceData = yield call(InvoiceApis.newInvoice, account,project,invoice);
    yield put(InvoiceActions.generateNewInvoiceSuccess(invoiceData));
    // yield put(getAllProjectsRequest(account));
  } catch (error: any) {
    yield put(InvoiceActions.generateNewInvoiceError(error?.message || 'default'))
  }
}
function* getAllInvoice({ account}: Params) {
  try {
    const invoiceData = yield call(InvoiceApis.getAllInvoices, account)
    yield put(InvoiceActions.getAllInvoiceSuccess(invoiceData))
  } catch (error: any) {
    yield put(InvoiceActions.getAllInvoiceError(error?.message || 'default'))
  }
}

function* getInvoice({ account,invoiceId}: Params) {
  try {
    const response = yield call(InvoiceApis.getInvoice, account,invoiceId)
    yield put(InvoiceActions.getInvoiceSuccess(response))
  } catch (error: any) {
    yield put(InvoiceActions.getInvoiceError(error?.message || 'default'))
  }
}
function* sendRevison({ account,invoiceId,conversation}: Params) {
  try {
    const response = yield call(InvoiceApis.sendRevisionRequest, account,invoiceId,conversation)
    yield put(InvoiceActions.sendRevisionSuccess())
  } catch (error: any) {
    yield put(InvoiceActions.sendRevisionError(error?.message || 'default'))
  }
}
function* allnvoiceConversation({ account,invoiceId}: Params) {
  try {
    const response = yield call(InvoiceApis.allInvoiceConversation, account,invoiceId)
    yield put(InvoiceActions.getAllInvoiceConversationSuccess(response))
  } catch (error: any) {
    yield put(InvoiceActions.getAllInvoiceConversationError(error?.message || 'default'))
  }
}

function* watchRequests() {
  yield takeLatest(ActionTypes.NEW_INVOICE_REQUEST, invoiceRequest)
  yield takeLatest(ActionTypes.GET_ALL_INVOICE_REQUEST, getAllInvoice)
  yield takeLatest(ActionTypes.GET_INVOICE_REQUEST, getInvoice)
  yield takeLatest(ActionTypes.SEND_REVISION_REQUEST,sendRevison)
  yield takeLatest(ActionTypes.GET_ALL_INVOICE_CONVERSATION_REQUEST,allnvoiceConversation)

}

export default function* sagas() {
  yield all([watchRequests()])
}
