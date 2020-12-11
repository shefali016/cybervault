import { all, call, put, takeLatest } from 'redux-saga/effects'
import {loginSuccess, loginFailure, signUpFailure, signUpSuccess, logoutSuccess, logoutFailure} from "../actions/authActions";
import * as Types from '../utils/types';
import * as ActionTypes from '../actions/actionTypes';
import { authRequest, signUpRequest, logoutRequest } from './authRequest'
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
function* signUp({user} : Params)
{console.log("in SAGA");
  try{
    const signUpResponse = yield call(signUpRequest, user);
    if (signUpResponse) {
      yield put(signUpSuccess(signUpResponse))
    } else {
      yield put(signUpFailure(signUpResponse))
    }
  } catch(error : any){
    yield put(signUpFailure(error))
  }
}

function* logout()
{
  try{
    const logoutResponse = yield call(logoutRequest);
    if (logoutResponse) {
      yield put(logoutSuccess())
    } else {
      yield put(logoutFailure())
    }

  }catch(error : any)
  {
    yield put (logoutFailure())
  }
}

function* watchGetRequest() {
 yield takeLatest(ActionTypes.LOGIN_REQUEST, login)
 yield takeLatest(ActionTypes.SIGNUP_REQUEST, signUp)
 yield takeLatest(ActionTypes.LOGOUT, logout)
}

export default function* sagas() {
  yield all([
    watchGetRequest()
  ])
}

