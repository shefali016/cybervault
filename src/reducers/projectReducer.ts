import {
  NEW_PROJECT_REQUEST,
  NEW_PROJECT_SUCCESS,
  NEW_PROJECT_FAILURE,
  CLEAR_NEW_PROJECT_SUCCESS,
  GET_ALL_PROJECT_REQUEST,
  GET_ALL_PROJECT_SUCCESS,
  GET_ALL_PROJECT_FAILURE
} from 'actions/actionTypes'
import * as Types from '../utils/types'

type State = {
  projectData: any
  error: any
  newProjectData: any
  isLoading: boolean
  allProjectsData: Types.AllProjects
}

type Action = {
  type: string
  payload: {}
  error: any
  projectData?: {}
  newProjectData?: {}
  allProjectsData?: {}
}

const initialState = {
  projectData: null,
  error: null,
  newProjectData: null,
  isLoading: false,
  allProjectsData: []
}

const createNewProject = (state: State, action: Action) => ({
  ...state,
  projectData: null,
  isLoading: true
})

const createNewProjectSuccess = (state: State, action: Action) => {
  return {
    ...state,
    newProjectData: action.payload,
    allProjectsData: [action.payload, ...state.allProjectsData],
    isLoading: false
  }
}

const createNewProjectFailure = (state: State, action: Action) => ({
  ...state,
  isLoading: false
})

const clearNewProjectData = (state: State) => {
  return {
    ...state,
    newProjectData: null
  }
}

const getAllProjects = (state: State, action: Action) => ({
  ...state,
  allProjectsData: null,
  isLoading: true
})

const getAllProjectsSuccess = (state: State, action: Action) => {
  return {
    ...state,
    allProjectsData: action.allProjectsData,
    isLoading: false
  }
}

const getAllProjectsFailure = (state: State, action: Action) => ({
  ...state,
  isLoading: false
})

const authReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case NEW_PROJECT_REQUEST:
      return createNewProject(state, action)
    case NEW_PROJECT_SUCCESS:
      return createNewProjectSuccess(state, action)
    case NEW_PROJECT_FAILURE:
      return createNewProjectFailure(state, action)
    case CLEAR_NEW_PROJECT_SUCCESS:
      return clearNewProjectData(state)
    case GET_ALL_PROJECT_REQUEST:
      return getAllProjects(state, action)
    case GET_ALL_PROJECT_SUCCESS:
      return getAllProjectsSuccess(state, action)
    case GET_ALL_PROJECT_FAILURE:
      return getAllProjectsFailure(state, action)
    default:
      return state
  }
}

export default authReducer
