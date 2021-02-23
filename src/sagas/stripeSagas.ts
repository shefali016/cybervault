import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionTypes from '../actions/actionTypes'
import * as StripeApis from '../apis/stripe'
import * as StripeActions from '../actions/stripeActions'
import { PaymentMethod } from '@stripe/stripe-js'
import { ReduxState } from 'reducers/rootReducer'

type Params = { type: string; paymentMethod: PaymentMethod }

function* attachPaymentMethod({ paymentMethod }: Params) {
  try {
    const user = yield select((state: ReduxState) => state.auth.user)
    yield call(
      StripeApis.attachPaymentMethod,
      paymentMethod.id,
      user.customerId
    )
    yield put(StripeActions.attachPaymentMethodSuccess(paymentMethod))
  } catch (error: any) {
    yield put(
      StripeActions.attachPaymentMethodFailure(error?.message || 'default')
    )
  }
}

function* detachPaymentMethod({ paymentMethod }: Params) {
  try {
    yield call(StripeApis.detachPaymentMethod, paymentMethod.id)
    yield put(StripeActions.detachPaymentMethodSuccess(paymentMethod))
  } catch (error: any) {
    yield put(
      StripeActions.detachPaymentMethodFailure(error?.message || 'default')
    )
  }
}

function* getPaymentMethods({}: Params) {
  try {
    const user = yield select((state: ReduxState) => state.auth.user)
    const paymentMethods = yield call(
      StripeApis.getPaymentMethods,
      user.customerId
    )
    yield put(StripeActions.requestPaymentMethodsSuccess(paymentMethods))
  } catch (error: any) {
    yield put(
      StripeActions.requestPaymentMethodsError(error?.message || 'default')
    )
  }
}

function* watchRequests() {
  yield takeLatest(ActionTypes.GET_PAYMENT_METHODS, getPaymentMethods)
  yield takeLatest(ActionTypes.ATTACH_PAYMENT_METHOD, attachPaymentMethod)
  yield takeLatest(ActionTypes.DETACH_PAYMENT_METHOD, detachPaymentMethod)
}

export default function* sagas() {
  yield all([watchRequests()])
}
