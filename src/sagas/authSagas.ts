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

type Params = { loginInfo: Types.UserLoginInfo; type: string }

function* login({ loginInfo }: Params) {
  try {
    console.log(loginInfo)
    const loginResponse = yield call(authRequest, loginInfo)
    yield put(loginSuccess(loginResponse))
  } catch (error: any) {
    console.log(error)
    yield put(loginFailure(error?.message))
  }
}

function* signUp({ loginInfo }: Params) {
  try {
    const signUpResponse = yield call(signUpRequest, loginInfo)
    yield put(signUpSuccess(signUpResponse))
  } catch (error: any) {
    yield put(signUpFailure(error?.message))
  }
}

function* logout() {
  try {
    yield call(logoutRequest)
    yield put(logoutSuccess())
  } catch (error: any) {
    yield put(logoutFailure())
  }
}

function* googleLogin() {
  try {
    const loginResponse = yield call(googleLoginRequest)
    yield put(googleLoginSuccess(loginResponse))
  } catch (error: any) {
    yield put(googleLoginFailure(error?.message))
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
