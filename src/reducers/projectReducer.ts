import {
    NEW_PROJECT_REQUEST,
    NEW_PROJECT_SUCCESS,
    NEW_PROJECT_FAILURE
  } from 'actions/actionTypes'
  import * as Types from '../utils/types';
  
  type State = {
    projectData: any,
    error: any
  };
  
  type Action = {
    type: string,
    payload: {},
    error: any,
    projectData?: {}
  };
  
  const initialState = {
    projectData: null,
    error: null
  }
  
  const createNewProject = (state: State, action: Action) => ({
    ...state,
    projectData: null
  })
  
  const createNewProjectSuccess = (state: State, action: Action) => {
    return ({
      ...state,
      projectData: action.payload
    })
  }
  
  const createNewProjectFailure = (state: State, action: Action) => ({
    ...state,
  })
  
  
  const authReducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case NEW_PROJECT_REQUEST: return createNewProject(state, action)
      case NEW_PROJECT_SUCCESS: return createNewProjectSuccess(state, action)
      case NEW_PROJECT_FAILURE: return createNewProjectFailure(state, action)
      default: return state
    }
  }
  
  export default authReducer
  