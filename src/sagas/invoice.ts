import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionTypes from '../actions/actionTypes'
import * as InvoiceApis from '../apis/invoiceApi'
import * as InvoiceActions from '../actions/invoiceActions'
import { Account ,Project,Invoice} from '../utils/types'

type Params = { account: Account; project:Project,invoice:Invoice; type: string }

function* invoiceRequest({ account,project,invoice}: Params) {
    console.log(account,project,invoice,"uuuuuuuuuuuu")
  try {
    const invoiceData = yield call(InvoiceApis.newInvoice, account,project,invoice)
    console.log(invoiceData,"pppppppppppp")
    yield put(InvoiceActions.generateNewInvoiceSuccess(invoiceData))
  } catch (error: any) {
    yield put(InvoiceActions.generateNewInvoiceError(error?.message || 'default'))
  }
}

function* watchRequests() {
    console.log('ttttttttttt')
  yield takeLatest(ActionTypes.NEW_INVOICE_REQUEST, invoiceRequest)
}

export default function* sagas() {
  yield all([watchRequests()])
}
