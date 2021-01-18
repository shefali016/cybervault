import {
  NEW_PROJECT_REQUEST,
  NEW_PROJECT_SUCCESS,
  NEW_PROJECT_FAILURE,
  GET_ALL_PROJECT_REQUEST,
  GET_ALL_PROJECT_SUCCESS,
  GET_ALL_PROJECT_FAILURE
} from 'actions/actionTypes'
import { createTransform } from 'redux-persist'
import * as Types from '../utils/types'

export type State = {
  projectData: any
  success: boolean
  error: string | null
  newProjectData: any
  isLoading: boolean
  allProjectsData: Types.AllProjects

  updateLoading: boolean
  updateError: null | string
  updateSuccess: boolean
}

export type Action = {
  type: string
  payload: {}
  error: string
  projectData?: {}
  newProjectData?: {}
  allProjectsData?: {}
}

const initialState = {
  projectData: null,
  success: false,
  error: null,
  newProjectData: null,
  isLoading: false,
  allProjectsData: [],
  updateLoading: false,
  updateSuccess: false,
  updateError: null
}

const createNewProject = (state: State, action: Action) => ({
  ...state,
  projectData: null,
  updateLoading: true,
  updateSuccess: false,
  updateError: null
})

const createNewProjectSuccess = (state: State, action: Action) => {
  return {
    ...state,
    newProjectData: action.payload,
    allProjectsData: [action.payload, ...state.allProjectsData],
    updateLoading: false,
    updateSuccess: true
  }
}

const createNewProjectFailure = (state: State, action: Action) => ({
  ...state,
  updateLoading: false,
  updateError: action.error
})

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

export const projectTransform = createTransform(
  (inboundState: State) => {
    return {
      ...inboundState,
      error: null,
      success: false,
      isLoading: false,
      updateLoading: false,
      newProjectData: null
    }
  },
  (outboundState: State) => outboundState,
  { whitelist: ['project'] }
)

export default authReducer
