import * as ActionTypes from './actionTypes';
import * as Types from '../utils/types';

export function login(user: Types.User) {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    user,
  };
}

export function loginSuccess (activeUser: any) {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    activeUser: activeUser,
    };
  };

export function loginFailure (error: any) {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    error
    };
  }

export function signUp(user: Types.User){
  return{
    type: ActionTypes.SIGNUP_REQUEST,
    user
  };
}

export function signUpSuccess (activeUser: Types.User) {
  console.log("user", activeUser);
  return {
  type: ActionTypes.SIGNUP_SUCCESS,
  activeUser: activeUser
  };
}

export function signUpFailure (error: any) {
  return {
  type: ActionTypes.SIGNUP_FAILURE,
  error
  };
}

export function logout(){
  return{
    type: ActionTypes.LOGOUT,
  };
}
export function logoutSuccess () {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
    };
};

export function logoutFailure () {
  return {
    type: ActionTypes.LOGOUT_FAILURE,
    };
}

export function googleLogin() {
  return {
    type: ActionTypes.GOOGLE_LOGIN_REQUEST
  };
}

export function googleLoginSuccess (activeUser: any) {
  return {
    type: ActionTypes.GOOGLE_LOGIN_SUCCESS,
    activeUser: activeUser,
    };
  };

export function googleLoginFailure (error: any) {
  return {
    type: ActionTypes.GOOGLE_LOGIN_FAILURE,
    error
    };
  }