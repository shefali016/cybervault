import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionTypes from '../actions/actionTypes'
import * as StripeApis from '../apis/stripe'
import * as StripeActions from '../actions/stripeActions'
import { PaymentMethod } from '@stripe/stripe-js'
import { ReduxState } from 'reducers/rootReducer'

type Params = {
  type: string
  paymentMethod: PaymentMethod
  planId: string
  paymentMethodId: string
  subscriptionId: string
}

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

function* getCustomer({}: Params) {
  try {
    const user = yield select((state: ReduxState) => state.auth.user)
    const customer = yield call(StripeApis.getStripeCustomer, user.customerId)
    yield put(StripeActions.getCustomerSuccess(customer))
  } catch (error: any) {
    yield put(StripeActions.getCustomerFailure(error?.message || 'default'))
  }
}

function* planSubscription({ planId, paymentMethodId }: Params) {
  try {
    const customerId = yield select(
      (state: ReduxState) => state.stripe.customer.id
    )
    const subscription = yield call(
      StripeApis.createStripePlanSubcription,
      customerId,
      planId,
      paymentMethodId
    )
    yield put(StripeActions.planSubscriptionSuccess(subscription))
  } catch (error: any) {
    yield put(
      StripeActions.planSubscriptionFailure(error?.message || 'default')
    )
  }
}

function* cancelPlanSubscription({ subscriptionId }: Params) {
  try {
    const subscription = yield call(
      StripeApis.cancelStripePlanSubcription,
      subscriptionId
    )
    yield put(StripeActions.cancelPlanSubscriptionSuccess(subscription))
  } catch (error: any) {
    yield put(
      StripeActions.cancelPlanSubscriptionFailure(error?.message || 'default')
    )
  }
}

function* updatePlanSubscription({ subscriptionId, planId }: Params) {
  try {
    const updatedSubscription = yield call(
      StripeApis.updateStripePlanSubcription,
      subscriptionId,
      planId
    )
    yield put(StripeActions.updatePlanSubscriptionSuccess(updatedSubscription))
  } catch (error: any) {
    yield put(
      StripeActions.updatePlanSubscriptionFailure(error?.message || 'default')
    )
  }
}

function* watchRequests() {
  yield takeLatest(ActionTypes.GET_PAYMENT_METHODS, getPaymentMethods)
  yield takeLatest(ActionTypes.ATTACH_PAYMENT_METHOD, attachPaymentMethod)
  yield takeLatest(ActionTypes.DETACH_PAYMENT_METHOD, detachPaymentMethod)
  yield takeLatest(ActionTypes.GET_CUSTOMER, getCustomer)
  yield takeLatest(ActionTypes.PLAN_SUBSCRIPTION, planSubscription)
  yield takeLatest(ActionTypes.CANCEL_PLAN_SUBSCRIPTION, cancelPlanSubscription)
  yield takeLatest(ActionTypes.UPDATE_PLAN_SUBSCRIPTION, updatePlanSubscription)
}

export default function* sagas() {
  yield all([watchRequests()])
}
