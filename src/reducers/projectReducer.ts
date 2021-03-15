import {
  NEW_PROJECT_REQUEST,
  NEW_PROJECT_SUCCESS,
  NEW_PROJECT_FAILURE,
  GET_ALL_PROJECT_REQUEST,
  GET_ALL_PROJECT_SUCCESS,
  GET_ALL_PROJECT_FAILURE,
  GET_PROJECT_DETAILS_REQUEST,
  GET_PROJECT_DETAILS_SUCCESS,
  GET_PROJECT_DETAILS_FAILURE,
  UPDATE_PROJECT_DETAILS_SUCCESS,
  UPDATE_PROJECT_DETAILS_FAILURE,
  UPDATE_PROJECT_DETAILS_REQUEST,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE
} from 'actions/actionTypes'
import { FaLessThanEqual } from 'react-icons/fa'
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
  projectDetails: Object
  isProjectDetailsLoading: boolean
  updateProjectSuccess: boolean
}

export type Action = {
  type: string
  payload: Types.Project
  error: string
  projectData: Types.Project
  newProjectData?: {}
  allProjectsData?: {}
  projectId?: string
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
  projectDetails: getProductData(),
  isProjectDetailsLoading: false,
  updateProjectSuccess: false,
  updateProjectFailure: null
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
  isLoading: false
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
    allProjectsData: replaceProject(action.payload, state)
  }
}

const getProjectDetailsFailure = (state: State, action: Action) => ({
  ...state,
  isProjectDetailsLoading: false,
  projectDetails: {}
})

const updateProjectDetailsRequest = (state: State, action: Action) => ({
  ...state,
  updateProjectSuccess: false,
  updateProjectFailure: null,
  isProjectDetailsLoading: true
})

const updateProjectDetailsSuccess = (state: State, action: Action) => ({
  ...state,
  projectDetails: action.projectData,
  allProjectsData: replaceProject(action.projectData, state),
  updateProjectSuccess: true,
  updateProjectFailure: null,
  isProjectDetailsLoading: false
})
const updateProjectDetailsFailure = (state: State, action: Action) => ({
  ...state,
  updateProjectSuccess: false,
  updateProjectFailure: 'Error in updating project details',
  isProjectDetailsLoading: false
})

// Delete Project

const deleteProjectRequest = (state: State, action: Action) => {
  return {
    ...state,
    deletingId: action.projectId,
    deleteError: null
  }
}

const deleteProjectSuccess = (state: State, action: Action) => {
  return {
    ...state,
    deletingId: null,
    allProjectsData: state.allProjectsData.filter(
      (project) => project.id !== action.projectId
    )
  }
}

const deleteProjectFailure = (state: State, action: Action) => {
  return {
    ...state,
    deletingId: null,
    deleteError: action.error
  }
}

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
    case DELETE_PROJECT_REQUEST:
      return deleteProjectRequest(state, action)
    case DELETE_PROJECT_SUCCESS:
      return deleteProjectSuccess(state, action)
    case DELETE_PROJECT_FAILURE:
      return deleteProjectFailure(state, action)
    default:
      return state
  }
}

export const projectTransform = createTransform(
  (inboundState: State) => {
    return {
      ...initialState,
      allProjectsData: inboundState.allProjectsData
    }
  },
  (outboundState: State) => outboundState,
  { whitelist: ['project'] }
)

const replaceProject = (project: Types.Project, state: State) =>
  state.allProjectsData.map((p) => (p.id === project.id ? project : p))

export default projectReducer
