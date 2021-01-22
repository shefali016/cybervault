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
  SIGNUP_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER,
  UPDATE_ACCOUNT,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE
} from 'actions/actionTypes'
import { User, Account } from 'utils/Interface'
import { createTransform } from 'redux-persist'

export type State = {
  isLoggedIn: boolean
  user: User | null
  account: Account | null
  error: string | null
  userUpdating: boolean
  userUpdateSuccess: boolean
  userUpdateError: string | null
  accountUpdating: boolean
  accountUpdateSuccess: boolean
  accountUpdateError: string | null
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
  error: null,
  userUpdating: false,
  userUpdateSuccess: false,
  userUpdateError: null,
  accountUpdating: false,
  accountUpdateSuccess: false,
  accountUpdateError: null
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
    case UPDATE_USER:
      return {
        ...state,
        userUpdating: true,
        userUpdateError: null,
        userUpdateSuccess: false
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
        userUpdateSuccess: true,
        userUpdating: false
      }
    case UPDATE_USER_FAILURE:
      return { ...state, userUpdateError: action.error, userUpdating: false }
    case UPDATE_ACCOUNT:
      return {
        ...state,
        accountUpdating: true,
        accountUpdateSuccess: false,
        accountUpdateError: false
      }
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: action.account,
        accountUpdating: false,
        accountUpdateSuccess: true
      }
    case UPDATE_ACCOUNT_FAILURE:
      return {
        ...state,
        accountUpdating: false,
        accountUpdateError: action.error
      }
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
