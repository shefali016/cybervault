import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
  LOGIN_REQUEST,
  SIGNUP_REQUEST
} from 'actions/actionTypes'
import { User } from 'utils/types'
import { createTransform } from 'redux-persist'

export type State = {
  isLoggedIn: boolean
  user: User | null
  account: Account | null
  error: string | null
}

export type Action = {
  type: string
  payload: {}
  error: Error
  user: User
  account: Account
}

const initialState = {
  user: null,
  account: null,
  isLoggedIn: false,
  error: null
}

const signUp = (state: State, action: Action) => ({ ...state, error: null })

const signUpFailure = (state: State, action: Action) => ({
  ...state,
  error: action.error
})

const signUpSuccess = (state: State, action: Action) => {
  return {
    ...state,
    isLoggedIn: true,
    user: action.user,
    account: action.account
  }
}

const login = (state: State, action: Action) => ({ ...state, error: null })

const loginFailure = (state: State, action: Action) => {
  console.log({
    ...state,
    error: action.error
  })
  return {
    ...state,
    error: action.error
  }
}

const loginSuccess = (state: State, action: Action) => {
  return {
    ...state,
    isLoggedIn: true,
    user: action.user,
    account: action.account
  }
}

const logoutFailure = (state: State, action: Action) => ({
  ...state,
  user: null
})

const logoutSuccess = (state: State, action: Action) => {
  return {
    ...state,
    isLoggedIn: false,
    user: null,
    account: null
  }
}

const googleLoginFailure = (state: State, action: Action) => ({
  ...state,
  error: action.error
})

const googleLoginSuccess = (state: State, action: Action) => {
  return {
    ...state,
    isLoggedIn: true,
    user: action.user,
    account: action.account
  }
}

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return signUp(state, action)
    case SIGNUP_SUCCESS:
      return signUpSuccess(state, action)
    case SIGNUP_FAILURE:
      return signUpFailure(state, action)
    case LOGIN_REQUEST:
      return login(state, action)
    case LOGIN_SUCCESS:
      return loginSuccess(state, action)
    case LOGIN_FAILURE:
      console.log(action)
      return loginFailure(state, action)
    case LOGOUT_SUCCESS:
      return logoutSuccess(state, action)
    case LOGOUT_FAILURE:
      return logoutFailure(state, action)
    case GOOGLE_LOGIN_SUCCESS:
      return googleLoginSuccess(state, action)
    case GOOGLE_LOGIN_FAILURE:
      return googleLoginFailure(state, action)
    default:
      return state
  }
}

export const authTransform = createTransform(
  (inboundState: State) => {
    return { ...inboundState, error: null }
  },
  (outboundState: State) => outboundState,
  { whitelist: ['auth'] }
)

export default authReducer
