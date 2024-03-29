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
  DELETE_PROJECT_FAILURE,
  GET_ASSET_LIST,
  GET_ASSET_LIST_SUCCESS,
  GET_ASSET_LIST_FAILURE,
  DELETE_ASSET,
  DELETE_ASSET_SUCCESS,
  DELETE_ASSET_FAILURE,
  GET_PROJECTS,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  GET_PORTFOLIO_SUCCESS
} from 'actions/actionTypes'
import { Set, Map } from 'immutable'

import { createTransform } from 'redux-persist'
import { addArrayToMap } from 'utils'
import { ProjectFilters } from 'utils/enums'
import * as Types from '../utils/Interface'
import { Asset, Project, ProjectCache } from '../utils/Interface'

export type State = {
  projectData: Project | null
  filteredIds: { [key in ProjectFilters]: Array<string> }
  loadingFilters: Set<ProjectFilters>
  success: boolean
  error: string | null
  newProjectData: Project | null
  isLoading: boolean
  allProjectsData: Types.AllProjects
  updateLoading: boolean
  updateError: null | string
  updateSuccess: boolean
  isProjectDetailsLoading: boolean
  updateProjectSuccess: boolean
  projectCache: ProjectCache
  // Assets
  allAssetList: Array<Types.Asset>
  assetLoading: boolean
  assetError: null | string
  assetSuccess: boolean
  deleteAssetLoading: boolean
  deleteAssetError: string | null
  deletingId: null | string
}

export type Action = {
  type: string
  payload: Types.Project
  error: string
  projectData: Types.Project
  newProjectData: Project
  allProjectsData: Project[]
  projectId: string
  assetList: Array<Types.Asset>
  assetId: string
  filter: ProjectFilters
  projects: Project[]
}

const buildDefaultFilteredIds = (): any => {
  let filteredIds: any = {}
  for (let filter in ProjectFilters) {
    filteredIds[filter] = []
  }
  return filteredIds
}

const initialState = {
  loadingFilters: Set<ProjectFilters>(),
  filteredIds: buildDefaultFilteredIds(),
  projectData: null,
  success: false,
  error: null,
  newProjectData: null,
  isLoading: false,
  allProjectsData: [],
  updateLoading: false,
  updateSuccess: false,
  updateError: null,
  isProjectDetailsLoading: false,
  updateProjectSuccess: false,
  updateProjectFailure: null,
  projectCache: Map<string, Project>(),
  // Assets
  allAssetList: [],
  assetLoading: false,
  assetSuccess: false,
  assetError: null,
  deleteAssetLoading: false,
  deleteAssetError: null,
  deletingId: null
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
    projectCache: state.projectCache.set(action.payload.id, action.payload),
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
  isLoading: true
})

const getAllProjectsSuccess = (state: State, action: Action) => {
  return {
    ...state,
    allProjectsData: action.allProjectsData,
    projectCache: addArrayToMap(state.projectCache, action.allProjectsData),
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
    projectCache: state.projectCache.set(action.payload.id, action.payload),
    allProjectsData: replaceProject(action.payload, state)
  }
}

const getProjectDetailsFailure = (state: State, action: Action) => ({
  ...state,
  isProjectDetailsLoading: false
})

const updateProjectDetailsRequest = (state: State, action: Action) => ({
  ...state,
  updateProjectSuccess: false,
  updateProjectFailure: null,
  isProjectDetailsLoading: true
})

const updateProjectDetailsSuccess = (state: State, action: Action) => ({
  ...state,
  projectCache: state.projectCache.set(
    action.projectData.id,
    action.projectData
  ),
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
    projectCache: state.projectCache.delete(action.projectId),
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

const getProjectsRequest = (state: State, action: Action) => {
  return {
    ...state,
    loadingFilters: state.loadingFilters.add(action.filter)
  }
}

const getProjectsSuccess = (state: State, action: Action) => {
  const { ids, cache } = action.projects.reduce(
    (
      acc: {
        ids: string[]
        cache: { [id: string]: Project }
      },
      project: Project
    ) => ({
      ids: [...acc.ids, project.id],
      cache: { ...acc.cache, [project.id]: project }
    }),
    {
      ids: [],
      cache: {}
    }
  )
  return {
    ...state,
    filteredIds: { ...state.filteredIds, [action.filter]: ids },
    projectCache: state.projectCache.merge(cache),
    loadingFilters: state.loadingFilters.remove(action.filter)
  }
}

const getProjectsFailure = (state: State, action: Action) => {
  return {
    ...state,
    loadingFilters: state.loadingFilters.remove(action.filter)
  }
}

const getAssetListRequest = (state: State, action: Action) => {
  return {
    ...state,
    assetError: null,
    assetLoading: true
  }
}

const getAssetListSuccess = (state: State, action: Action) => {
  return {
    ...state,
    allAssetList: action.assetList,
    assetLoading: false,
    assetSuccess: true
  }
}

const getAssetListFailure = (state: State, action: Action) => {
  return {
    ...state,
    assetLoading: false,
    assetError: action.error
  }
}
// Get All asset data

const deleteAssetRequest = (state: State, action: Action) => {
  return {
    ...state,
    deleteAssetError: null,
    deleteAssetLoading: true
  }
}

const deleteAssetSuccess = (state: State, action: Action) => {
  return {
    ...state,
    allAssetList: state.allAssetList.filter(
      (asset: Asset) => asset.id !== action.assetId
    ),
    projectCache: action.projectId
      ? state.projectCache.update(action.projectId, (project: Project) => ({
          ...project,
          videos: project.videos.filter((id) => id !== action.assetId),
          images: project.images.filter((id) => id !== action.assetId)
        }))
      : state.projectCache,
    deleteAssetSuccess: true
  }
}

const deleteAssetFailure = (state: State, action: Action) => {
  return {
    ...state,
    deleteAssetLoading: false,
    deleteAssetError: action.error
  }
}

const getPortfolioSuccess = (state: State, action: Action) => ({
  ...state,
  projectCache: action.projects
    ? addArrayToMap(state.projectCache, action.projects)
    : state.projectCache
})

const projectReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case GET_PORTFOLIO_SUCCESS:
      return getPortfolioSuccess(state, action)
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
    case GET_ASSET_LIST:
      return getAssetListRequest(state, action)
    case GET_ASSET_LIST_SUCCESS:
      return getAssetListSuccess(state, action)
    case GET_ASSET_LIST_FAILURE:
      return getAssetListFailure(state, action)
    case DELETE_ASSET:
      return deleteAssetRequest(state, action)
    case DELETE_ASSET_SUCCESS:
      return deleteAssetSuccess(state, action)
    case DELETE_ASSET_FAILURE:
      return deleteAssetFailure(state, action)
    case GET_PROJECTS:
      return getProjectsRequest(state, action)
    case GET_PROJECTS_SUCCESS:
      return getProjectsSuccess(state, action)
    case GET_PROJECTS_FAILURE:
      return getProjectsFailure(state, action)
    default:
      return state
  }
}

export const projectTransform = createTransform(
  (inboundState: State) => {
    return inboundState
  },
  (outboundState: State) => ({
    ...initialState,
    allProjectsData: outboundState.allProjectsData,
    filteredIds: outboundState.filteredIds,
    projectCache: outboundState.projectCache
  }),
  { whitelist: ['project'] }
)

const replaceProject = (project: Types.Project, state: State) =>
  state.allProjectsData.map((p) => (p.id === project.id ? project : p))

export default projectReducer
