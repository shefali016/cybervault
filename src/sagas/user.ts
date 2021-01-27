import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionTypes from '../actions/actionTypes'
import * as UserApis from '../apis/user'
import * as UserActions from '../actions/user'
import { User } from '../utils/types'

type Params = { update: Partial<User>; type: string; id: string }

function* updateUser({ update }: Params) {
  try {
    const activeUser = yield select((state) => state.auth.user)
    const updatedUser = yield call(UserApis.updateUser, {
      ...activeUser,
      ...update
    })
    yield put(UserActions.updateUserSuccess(updatedUser))
  } catch (error: any) {
    yield put(UserActions.updateUserFailure(error?.message || 'default'))
  }
}

function* getUser({ id }: Params) {
  try {
    const user = yield call(UserApis.getUser, id)
    yield put(UserActions.getUserSuccess(user))
  } catch (error: any) {
    yield put(UserActions.getUserFailure(error?.message || 'default'))
  }
}

function* watchRequests() {
  yield takeLatest(ActionTypes.UPDATE_USER, updateUser)
  yield takeLatest(ActionTypes.GET_USER, getUser)
}

export default function* sagas() {
  yield all([watchRequests()])
}
