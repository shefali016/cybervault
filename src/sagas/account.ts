import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionTypes from '../actions/actionTypes'
import * as AccountApis from '../apis/account'
import * as AccountActions from '../actions/account'
import { Account } from '../utils/types'

type Params = { account: Account; type: string }

function* updateAccount({ account }: Params) {
  try {
    const updatedAccount = yield call(AccountApis.updateAccount, account)
    yield put(AccountActions.updateAccountSuccess(updatedAccount))
  } catch (error: any) {
    yield put(AccountActions.updateAccountFailure(error?.message || 'default'))
  }
}

function* watchRequests() {
  yield takeLatest(ActionTypes.UPDATE_ACCOUNT, updateAccount)
}

export default function* sagas() {
  yield all([watchRequests()])
}
