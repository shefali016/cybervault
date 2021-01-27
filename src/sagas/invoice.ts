import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionTypes from '../actions/actionTypes'
import * as InvoiceApis from '../apis/invoiceApi'
import * as InvoiceActions from '../actions/invoiceActions'
import { Account ,Project,Invoice} from '../utils/types'

type Params = { account: Account; project:Project,invoice:Invoice; type: string }

function* invoiceRequest({ account,project,invoice}: Params) {
  try {
    const invoiceData = yield call(InvoiceApis.newInvoice, account,project,invoice)
    yield put(InvoiceActions.generateNewInvoiceSuccess(invoiceData))
  } catch (error: any) {
    yield put(InvoiceActions.generateNewInvoiceError(error?.message || 'default'))
  }
}
function* getAllInvoice({ account,project}: Params) {
  try {
    const invoiceData = yield call(InvoiceApis.getAllInvoices, account,project)
    yield put(InvoiceActions.getInvoiceSuccess(invoiceData))
  } catch (error: any) {
    yield put(InvoiceActions.getInvoiceError(error?.message || 'default'))
  }
}

function* watchRequests() {
  yield takeLatest(ActionTypes.NEW_INVOICE_REQUEST, invoiceRequest)
  yield takeLatest(ActionTypes.GET_INVOICE_REQUEST, getAllInvoice)

}

export default function* sagas() {
  yield all([watchRequests()])
}
