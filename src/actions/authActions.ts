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

// export function SignUpSuccess () ({
//   type: SIGNUP_SUCCESS
// })

// export function SignUpFailure () ({
//   type: SIGNUP_FAILURE
// })
