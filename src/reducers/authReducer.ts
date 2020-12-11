import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
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
  console.log("reducer", action.activeUser);
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
    default: return state
  }
}

export default authReducer
