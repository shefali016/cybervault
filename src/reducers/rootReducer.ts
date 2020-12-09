import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import { reducer as formReducer } from 'redux-form'

const appReducer = combineReducers({
  // routing: routerReducer,
  auth: authReducer,
  form: formReducer
})

type State = {
  auth: any,
  form?: any
};

type Action = {
  type: string,
  payload?: {},
};

const rootReducer = (state: State, action: Action) => {
  if (action.type === 'RESET_ALL_DATA') {
    state = {
      auth: state.auth
    }
  }
  return appReducer(state as any, action)
}

export default rootReducer
