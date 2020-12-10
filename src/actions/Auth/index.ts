import {
  SIGNUP_SUCCESS,
SIGNUP_FAILURE,
LOGIN_SUCCESS,
LOGIN_FAILURE
} from './actionTypes'


export const SignUpSuccess = () => ({
  type: SIGNUP_SUCCESS
})

export const SignUpFailure = () => ({
  type: SIGNUP_FAILURE
})

export const LoginSuccess = (activeUser: any) => {
  return {
  type: LOGIN_SUCCESS,
  activeUser: activeUser,
  };
  };

// export const LoginSuccess = (data: any) => {  console.log("jahsdfkj");
// return{
//   type: LOGIN_SUCCESS,
//   payload: data
// }}

export const LoginFailure = () => ({
  type: LOGIN_FAILURE 
})
