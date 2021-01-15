import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  loginSuccess,
  loginFailure,
  signUpFailure,
  signUpSuccess,
  logoutSuccess,
  logoutFailure,
  googleLoginSuccess,
  googleLoginFailure
} from '../actions/authActions'
import * as Types from '../utils/types'
import * as ActionTypes from '../actions/actionTypes'
import {
  authRequest,
  signUpRequest,
  logoutRequest,
  googleLoginRequest
} from '../apis/authRequest'

type Params = { user: Types.UserLoginInfo; type: string }

function* login({ user }: Params) {
  try {
    const loginResponse = yield call(authRequest, user)
    if (loginResponse) {
      yield put(loginSuccess(loginResponse))
    } else {
      yield put(loginFailure(loginResponse))
    }
  } catch (error: any) {
    yield put(loginFailure(error))
  }
}

function* signUp({ user }: Params) {
  try {
    const signUpResponse = yield call(signUpRequest, user)
    if (signUpResponse) {
      yield put(signUpSuccess(signUpResponse))
    } else {
      yield put(signUpFailure(signUpResponse))
    }
  } catch (error: any) {
    yield put(signUpFailure(error))
  }
}

function* logout() {
  try {
    const logoutResponse = yield call(logoutRequest)
    if (logoutResponse) {
      yield put(logoutSuccess())
    } else {
      yield put(logoutFailure())
    }
  } catch (error: any) {
    yield put(logoutFailure())
  }
}

function* googleLogin() {
  try {
    const loginResponse = yield call(googleLoginRequest)
    if (loginResponse) {
      yield put(googleLoginSuccess(loginResponse))
    } else {
      yield put(googleLoginFailure(loginResponse))
    }
  } catch (error: any) {
    yield put(googleLoginFailure(error))
  }
}

function* watchGetRequest() {
  yield takeLatest(ActionTypes.LOGIN_REQUEST, login)
  yield takeLatest(ActionTypes.SIGNUP_REQUEST, signUp)
  yield takeLatest(ActionTypes.LOGOUT, logout)
  yield takeLatest(ActionTypes.GOOGLE_LOGIN_REQUEST, googleLogin)
}

export default function* sagas() {
  yield all([watchGetRequest()])
}
