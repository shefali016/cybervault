import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionTypes from '../actions/actionTypes'
import * as InvoiceApis from '../apis/invoiceApi'
import * as InvoiceActions from '../actions/invoiceActions'
import {
  Account,
  Project,
  Invoice,
  InvoiceConversation,
  InvoiceShare
} from '../utils/Interface'
import * as StripeApis from '../apis/stripe'
import { InvoiceStatuses } from '../utils/enums'
import { ReduxState } from 'reducers/rootReducer'
import { GetParams } from 'utils/Interface/api'

type Params = {
  account: Account
  project: Project
  invoice: Invoice
  type: string
  invoiceId: string
  accountId: string
  conversation: InvoiceConversation
  tokenId: string
  amount: number
  stripeAccountId: string
  transactionFee: number
  invoiceShare: InvoiceShare
  filter: string
  params: GetParams
}

function* invoiceRequest({ account, project, invoice, invoiceShare }: Params) {
  try {
    const invoiceData: Invoice = yield call(
      InvoiceApis.newInvoice,
      account,
      project,
      invoice,
      invoiceShare
    )
    yield put(InvoiceActions.generateNewInvoiceSuccess(invoiceData))
  } catch (error: any) {
    yield put(
      InvoiceActions.generateNewInvoiceError(error?.message || 'default')
    )
  }
}
function* getAllInvoice({ account }: Params) {
  try {
    const invoiceData: Invoice[] = yield call(
      InvoiceApis.getAllInvoices,
      account
    )
    yield put(InvoiceActions.getAllInvoiceSuccess(invoiceData))
  } catch (error: any) {
    yield put(InvoiceActions.getAllInvoiceError(error?.message || 'default'))
  }
}

function* getInvoice({ accountId, invoiceId }: Params) {
  try {
    const response: Invoice = yield call(
      InvoiceApis.getInvoice,
      accountId,
      invoiceId
    )

    yield put(InvoiceActions.getInvoiceSuccess(response))
  } catch (error: any) {
    yield put(InvoiceActions.getInvoiceError(error?.message || 'default'))
  }
}
function* sendRevison({ accountId, invoiceId, conversation }: Params) {
  try {
    yield call(
      InvoiceApis.sendRevisionRequest,
      accountId,
      invoiceId,
      conversation
    )
    yield put(InvoiceActions.sendRevisionSuccess())
    yield put(
      InvoiceActions.getAllInvoiceConversationRequest(accountId, invoiceId)
    )
  } catch (error: any) {
    yield put(InvoiceActions.sendRevisionError(error?.message || 'default'))
  }
}
function* allnvoiceConversation({ accountId, invoiceId }: Params) {
  try {
    const response: InvoiceConversation[] = yield call(
      InvoiceApis.allInvoiceConversation,
      accountId,
      invoiceId
    )
    yield put(
      InvoiceActions.getAllInvoiceConversationSuccess({ [invoiceId]: response })
    )
  } catch (error: any) {
    yield put(
      InvoiceActions.getAllInvoiceConversationError(error?.message || 'default')
    )
  }
}

function* payInvoice({
  amount,
  tokenId,
  invoiceId,
  account,
  stripeAccountId,
  transactionFee
}: Params) {
  try {
    yield call(
      StripeApis.oneTimeCharge,
      amount,
      tokenId,
      stripeAccountId,
      transactionFee
    )
    const invoiceData: any = {
      isPaid: true,
      status: InvoiceStatuses.PAID
    }
    yield call(InvoiceApis.updateInvoice, account, invoiceId, invoiceData)
    yield put(InvoiceActions.payInvoiceSuccess(invoiceId))
  } catch (error: any) {
    yield put(InvoiceActions.payInvoiceError(error?.message || 'default'))
  }
}

function* deleteInvoice({ invoice }: Params) {
  try {
    const account: Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    yield call(InvoiceApis.deleteInvoice, account, invoice)
    yield put(InvoiceActions.deleteInvoiceSuccess(invoice.id))
  } catch (error) {
    yield put(InvoiceActions.deleteInvoiceFailure(error || 'default'))
  }
}

function* getInvoices({ params, filter }: Params) {
  try {
    const account: Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const invoices: Invoice[] = yield call(
      InvoiceApis.getInvoices,
      account,
      params
    )
    yield put(InvoiceActions.getInvoicesSuccess(invoices, filter))
  } catch (error) {
    yield put(InvoiceActions.getInvoicesFailure(error || 'default', filter))
  }
}

function* watchRequests() {
  yield takeLatest(ActionTypes.NEW_INVOICE_REQUEST, invoiceRequest)
  yield takeLatest(ActionTypes.GET_ALL_INVOICE_REQUEST, getAllInvoice)
  yield takeLatest(ActionTypes.GET_INVOICE_REQUEST, getInvoice)
  yield takeLatest(ActionTypes.SEND_REVISION_REQUEST, sendRevison)
  yield takeLatest(
    ActionTypes.GET_ALL_INVOICE_CONVERSATION_REQUEST,
    allnvoiceConversation
  )
  yield takeLatest(ActionTypes.PAY_INVOICE, payInvoice)
  yield takeLatest(ActionTypes.DELETE_INVOICE, deleteInvoice)
  yield takeLatest(ActionTypes.GET_INVOICES, getInvoices)
}

export default function* sagas() {
  yield all([watchRequests()])
}
