import * as ActionTypes from './actionTypes'
import * as Types from '../utils/Interface'
import { GetParams } from 'utils/Interface/api'
import { ProjectFilters } from 'utils/enums'

export const getProjects = (params: GetParams, filter: ProjectFilters) => ({
  type: ActionTypes.GET_PROJECTS,
  params,
  filter
})
export const getProjectsSuccess = (
  projects: Array<Types.Project>,
  filter: ProjectFilters
) => ({
  type: ActionTypes.GET_PROJECTS_SUCCESS,
  projects,
  filter
})
export const getProjectsFailure = (error: string, filter: ProjectFilters) => ({
  type: ActionTypes.GET_PROJECTS_FAILURE,
  error,
  filter
})

export function createNewProjectRequest(newProjectData: Types.Project) {
  return {
    type: ActionTypes.NEW_PROJECT_REQUEST,
    newProjectData
  }
}

export function createNewProjectSuccess(newProjectData: Types.Project) {
  return {
    type: ActionTypes.NEW_PROJECT_SUCCESS,
    payload: newProjectData
  }
}

export function createNewProjectFailure(error: string) {
  return {
    type: ActionTypes.NEW_PROJECT_FAILURE,
    error
  }
}

export function getAllProjects() {
  return {
    type: ActionTypes.GET_ALL_PROJECT_REQUEST
  }
}

export function getAllProjectsSuccess(allProjectsData: Types.AllProjects) {
  return {
    type: ActionTypes.GET_ALL_PROJECT_SUCCESS,
    allProjectsData
  }
}

export function getAllProjectsFailure(error: string) {
  return {
    type: ActionTypes.GET_ALL_PROJECT_FAILURE,
    error
  }
}

export function requestGetProjectDetails(
  accountId: string,
  projectId: string | undefined
) {
  return {
    type: ActionTypes.GET_PROJECT_DETAILS_REQUEST,
    accountId,
    projectId
  }
}

export function getProjectDetailsSuccess(projectData: Object | undefined) {
  return {
    type: ActionTypes.GET_PROJECT_DETAILS_SUCCESS,
    payload: projectData
  }
}
export function getProjectDetailsFailure(error: string) {
  return {
    type: ActionTypes.GET_PROJECT_DETAILS_FAILURE,
    error
  }
}

export function requestUpdateProjectDetails(
  projectdata: Types.Project | undefined
) {
  return {
    type: ActionTypes.UPDATE_PROJECT_DETAILS_REQUEST,
    projectdata
  }
}

export function updateProjectDetailsSuccess(projectData: Types.Project) {
  return {
    type: ActionTypes.UPDATE_PROJECT_DETAILS_SUCCESS,
    projectData
  }
}
export function updateProjectDetailsFailure(error: string) {
  return {
    type: ActionTypes.UPDATE_PROJECT_DETAILS_FAILURE,
    error
  }
}

export const deleteProjectRequest = (projectId: string) => ({
  type: ActionTypes.DELETE_PROJECT_REQUEST,
  projectId
})

export const deleteProjectSuccess = (projectId: string) => ({
  type: ActionTypes.DELETE_PROJECT_SUCCESS,
  projectId
})

export const deleteProjectFailure = (error: string, projectId: string) => ({
  type: ActionTypes.DELETE_PROJECT_FAILURE,
  error,
  projectId
})

export const getAssetListRequest = () => ({
  type: ActionTypes.GET_ASSET_LIST
})

export const getAssetListSuccess = (assetList: Array<Types.Asset>) => ({
  type: ActionTypes.GET_ASSET_LIST_SUCCESS,
  assetList
})

export const getAssetListFailure = (error: string) => ({
  type: ActionTypes.GET_ASSET_LIST_FAILURE,
  error
})

export const deleteAssetRequest = (assetId: string, projectId?: string) => ({
  type: ActionTypes.DELETE_ASSET,
  assetId,
  projectId
})

export const deleteAssetSuccess = (assetId: string, projectId?: string) => ({
  type: ActionTypes.DELETE_ASSET_SUCCESS,
  assetId,
  projectId
})

export const deleteAssetFailure = (error: string) => ({
  type: ActionTypes.DELETE_ASSET_FAILURE,
  error
})
