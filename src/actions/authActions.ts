import * as ActionTypes from './actionTypes'
import { User, UserLoginInfo, Account } from '../utils/types'

export function login(loginInfo: UserLoginInfo) {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    loginInfo
  }
}

export function loginSuccess({
  user,
  account
}: {
  user: User
  account: Account
}) {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    user,
    account
  }
}

export function loginFailure(error: string) {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    error
  }
}

export function signUp(loginInfo: UserLoginInfo) {
  return {
    type: ActionTypes.SIGNUP_REQUEST,
    loginInfo
  }
}

export function signUpSuccess({
  user,
  account
}: {
  user: User
  account: Account
}) {
  return {
    type: ActionTypes.SIGNUP_SUCCESS,
    user,
    account
  }
}

export function signUpFailure(error: string) {
  return {
    type: ActionTypes.SIGNUP_FAILURE,
    error
  }
}

export function logout() {
  return {
    type: ActionTypes.LOGOUT
  }
}
export function logoutSuccess() {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

export function logoutFailure() {
  return {
    type: ActionTypes.LOGOUT_FAILURE
  }
}

export function googleLogin() {
  return {
    type: ActionTypes.GOOGLE_LOGIN_REQUEST
  }
}

export function googleLoginSuccess({
  user,
  account
}: {
  user: User
  account: Account
}) {
  return {
    type: ActionTypes.GOOGLE_LOGIN_SUCCESS,
    user,
    account
  }
}

export function googleLoginFailure(error: any) {
  return {
    type: ActionTypes.GOOGLE_LOGIN_FAILURE,
    error
  }
}
