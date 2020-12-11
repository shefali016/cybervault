import { all, call, put, takeLatest } from 'redux-saga/effects'
import {loginSuccess, loginFailure} from "../actions/authActions";
import * as Types from '../utils/types';
import * as ActionTypes from '../actions/actionTypes';
import { authRequest } from './authRequest'
type Params = { user: Types.User, type: string }

function* login({ user }: Params) {
  try {
    const loginResponse = yield call(authRequest, user);
    if (loginResponse) {
      yield put(loginSuccess(loginResponse))
    } else {
      yield put(loginFailure(loginResponse))
    }
  } catch (error: any) {
    yield put(loginFailure(error))
  }
}

function* watchGetRequest() {
 yield takeLatest(ActionTypes.LOGIN_REQUEST, login)
}

export default function* sagas() {
  yield all([
    watchGetRequest()
  ])
}
