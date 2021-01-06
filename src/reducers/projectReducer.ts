import {
    NEW_PROJECT_REQUEST,
    NEW_PROJECT_SUCCESS,
    NEW_PROJECT_FAILURE,
    CLEAR_NEW_PROJECT_SUCCESS
  } from 'actions/actionTypes'
  import * as Types from '../utils/types';
  
  type State = {
    projectData: any,
    error: any,
    newProjectData: any,
    isLoading: boolean
  };
  
  type Action = {
    type: string,
    payload: {},
    error: any,
    projectData?: {},
    newProjectData?: {}
  };
  
  const initialState = {
    projectData: null,
    error: null,
    newProjectData: null,
    isLoading: false
  }
  
  const createNewProject = (state: State, action: Action) => ({
    ...state,
    projectData: null,
    isLoading: true
  })
  
  const createNewProjectSuccess = (state: State, action: Action) => {
    return ({
      ...state,
      newProjectData: action.payload,
      isLoading: false
    })
  }
  
  const createNewProjectFailure = (state: State, action: Action) => ({
    ...state,
    isLoading: false
  })

  const clearNewProjectData = (state: State) => {
    return ({
    ...state,
    newProjectData: null
  })
  }
  
  
  const authReducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case NEW_PROJECT_REQUEST: return createNewProject(state, action)
      case NEW_PROJECT_SUCCESS: return createNewProjectSuccess(state, action)
      case NEW_PROJECT_FAILURE: return createNewProjectFailure(state, action)
      case CLEAR_NEW_PROJECT_SUCCESS: return clearNewProjectData(state)
      default: return state
    }
  }
  
  export default authReducer
  