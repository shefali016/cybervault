import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE
} from 'actions/actionTypes'

type State = {
  isLoggedIn: Boolean,
  user: any,
  error: any
};

type Action = {
  type: string,
  payload: {},
  error: any,
  activeUser: {}
};

const initialState = {
  user: null,
  isLoggedIn: false,
  error: null
}

const signUpFailure = (state: State, action: Action) => ({
  ...state,
  isLoggedIn: false,
  user: null,
  error: action.error

})

const signUpSuccess = (state: State, action: Action) => {
  return ({
    ...state,
    isLoggedIn: true,
    user: action.activeUser
  })
}

const loginFailure = (state: State, action: Action) => ({
  ...state,
  isLoggedIn: false,
  user: null,
  error: action.error
})

const loginSuccess = (state: State, action: Action) => {
  return ({
    ...state,
    isLoggedIn: true,
    user: action.activeUser
  })
}

const logoutFailure = (state: State, action: Action) => ({
  ...state,
  isLoggedIn: false,
  user: null,
})

const logoutSuccess = (state: State, action: Action) => {
  return ({
    ...state,
    isLoggedIn: false,
    user: null
  })
}

const googleLoginFailure = (state: State, action: Action) => ({
  ...state,
  isLoggedIn: false,
  user: null,
  error: action.error
})

const googleLoginSuccess = (state: State, action: Action) => {
  return ({
    ...state,
    isLoggedIn: true,
    user: action.activeUser
  })
}

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS: return signUpSuccess(state, action)
    case SIGNUP_FAILURE: return signUpFailure(state, action)
    case LOGIN_SUCCESS: return loginSuccess(state, action)
    case LOGIN_FAILURE: return loginFailure(state, action)
    case LOGOUT_SUCCESS: return logoutSuccess(state, action)
    case LOGOUT_FAILURE: return logoutFailure(state, action)
    case GOOGLE_LOGIN_SUCCESS: return googleLoginSuccess(state, action)
    case GOOGLE_LOGIN_FAILURE: return googleLoginFailure(state, action)
    default: return state
  }
}

export default authReducer
