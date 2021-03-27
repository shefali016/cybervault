import { all, call, put, select, takeLatest, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as ActionTypes from '../actions/actionTypes'
import * as AccountApis from '../apis/account'
import * as AccountActions from '../actions/account'
import { Account } from '../utils/Interface'
import { ReduxState } from 'reducers/rootReducer'
import { listenToStorage } from '../apis/account'

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

function* listenToStorageSaga() {
  try {
    const accountId = yield select((state) => state.auth.account.id)

    const listener = eventChannel((emit) => {
      return listenToStorage(accountId, emit)
    })

    while (true) {
      const storage = yield take(listener)
      yield put(AccountActions.getUsedStorageSuccess(storage))
    }
  } catch (error: any) {
    yield put(AccountActions.getUsedStorageFailure(error?.message || 'default'))
  }
}

function* watchRequests() {
  yield takeLatest(ActionTypes.UPDATE_ACCOUNT, updateAccount)
  yield takeLatest(ActionTypes.GET_ACCOUNT, getAccount)
  yield takeLatest(ActionTypes.GET_STORAGE_USED, listenToStorageSaga)
}

export default function* sagas() {
  yield all([watchRequests()])
}
