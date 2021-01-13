import { combineReducers } from 'redux'
// import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { reducer as formReducer } from 'redux-form'
import {State as AuthState, Action as AuthAction} from "./authReducer"
import {State as ProjectState, Action as ProjectAction} from "./projectReducer"


const appReducer = combineReducers({
  auth: authReducer,
  project: projectReducer
})

export type ReduxState = {
  auth: AuthState,
  project: ProjectState
};

export type Action = AuthAction & ProjectAction

const rootReducer = (state: ReduxState, action: Action) => {
  if (action.type === 'RESET_ALL_DATA') {
    state = {
      auth: state.auth,
      project: state.project
    }
  }
  return appReducer(state as any, action)
}

export default rootReducer
