import { all, call, put, takeLatest } from 'redux-saga/effects'
import * as ActionTypes from '../actions/actionTypes'
import * as AccountApis from '../apis/account'
import * as AccountActions from '../actions/account'
import { Account } from '../utils/types'

type Params = { account: Account; type: string; id: string }

function* updateAccount({ account }: Params) {
  try {
    const updatedAccount = yield call(AccountApis.updateAccount, account)
    yield put(AccountActions.updateAccountSuccess(updatedAccount))
  } catch (error: any) {
    yield put(AccountActions.updateAccountFailure(error?.message || 'default'))
  }
}

function* getAccount({ id }: Params) {
  try {
    const account = yield call(AccountApis.getAccount, id)
    yield put(AccountActions.getAccountSuccess(account))
  } catch (error: any) {
    yield put(AccountActions.getAccountFailure(error?.message || 'default'))
  }
}

function* watchRequests() {
  yield takeLatest(ActionTypes.UPDATE_ACCOUNT, updateAccount)
  yield takeLatest(ActionTypes.GET_ACCOUNT, getAccount)
}

export default function* sagas() {
  yield all([watchRequests()])
}
