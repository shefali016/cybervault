import {
  NEW_PROJECT_REQUEST,
  NEW_PROJECT_SUCCESS,
  NEW_PROJECT_FAILURE,
  GET_ALL_PROJECT_REQUEST,
  GET_ALL_PROJECT_SUCCESS,
  GET_ALL_PROJECT_FAILURE,
  USER_IS_ON_UPDATE_SCREEN,
  GET_PROJECT_DETAILS_REQUEST,
  GET_PROJECT_DETAILS_SUCCESS,
  GET_PROJECT_DETAILS_FAILURE,
  UPDATE_PROJECT_DETAILS_SUCCESS,
  UPDATE_PROJECT_DETAILS_FAILURE,
  UPDATE_PROJECT_DETAILS_REQUEST
} from 'actions/actionTypes'
import { createTransform } from 'redux-persist'
import { getProductData } from 'utils'
import * as Types from '../utils/Interface'

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
  onEditProjectScreen: boolean
  projectDetails: Object
  isProjectDetailsLoading: boolean
  isUpdatedSuccess: boolean
  updateDetails: boolean
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
  updateError: null,
  onEditProjectScreen: false,
  projectDetails: getProductData(),
  isProjectDetailsLoading: false,
  isUpdatedSuccess: false,
  updateDetails: false,
  projectUpdateError: null
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
    isLoading: false,
    updateSuccess: false
  }
}

const getAllProjectsFailure = (state: State, action: Action) => ({
  ...state,
  isLoading: false,
})

const onEditProject = (state: State, action: Action) => ({
  ...state,
  onEditProjectScreen: action.payload
})

//Get Single project details

const getProjectDetails = (state: State, action: Action) => ({
  ...state,
  isProjectDetailsLoading: true
})

const getProjectDetailsSuccess = (state: State, action: Action) => {
  return {
    ...state,
    isProjectDetailsLoading: false,
    projectDetails: action.payload,
    isUpdatedSuccess: false,
    projectUpdateError: null,
    updateDetails: false
  }
}

const getProjectDetailsFailure = (state: State, action: Action) => ({
  ...state,
  isProjectDetailsLoading: false,
  projectDetails: {}
})

const updateProjectDetailsRequest = (state: State, action: Action) => ({
  ...state,
  isUpdatedSuccess: true,
  updateDetails: true,
  isProjectDetailsLoading: true
})

const updateProjectDetailsSuccess = (state: State, action: Action) => ({
  ...state,
  updateDetails: false,
  projectDetails: action.projectData,
  isUpdatedSuccess: false,
  projectUpdateError: null,
  isProjectDetailsLoading: false
})
const updateProjectDetailsFailure = (state: State, action: Action) => ({
  ...state,
  isUpdatedSuccess: false,
  projectUpdateError: 'Error in updating project details',
  updateDetails: false,
  isProjectDetailsLoading: false
})
const projectReducer = (state = initialState, action: Action) => {
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
    case USER_IS_ON_UPDATE_SCREEN:
      return onEditProject(state, action)
    case GET_PROJECT_DETAILS_REQUEST:
      return getProjectDetails(state, action)
    case GET_PROJECT_DETAILS_SUCCESS:
      return getProjectDetailsSuccess(state, action)
    case GET_PROJECT_DETAILS_FAILURE:
      return getProjectDetailsFailure(state, action)
    case UPDATE_PROJECT_DETAILS_SUCCESS:
      return updateProjectDetailsSuccess(state, action)
    case UPDATE_PROJECT_DETAILS_FAILURE:
      return updateProjectDetailsFailure(state, action)
    case UPDATE_PROJECT_DETAILS_REQUEST:
      return updateProjectDetailsRequest(state, action)
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
      newProjectData: null,
      isUpdatedSuccess: false,
      updateDetails: false,
    }
  },
  (outboundState: State) => outboundState,
  { whitelist: ['project'] }
)

export default projectReducer
