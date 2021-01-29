import * as ActionTypes from './actionTypes'
import * as Types from '../utils/types'

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

export function getAllProjectsRequest(account: Types.Account) {
  return {
    type: ActionTypes.GET_ALL_PROJECT_REQUEST,
    account
  }
}

export function getAllProjectsRequestSuccess(
  allProjectsData: Types.AllProjects
) {
  return {
    type: ActionTypes.GET_ALL_PROJECT_SUCCESS,
    allProjectsData
  }
}

export function getAllProjectsRequestFailure(error: string) {
  return {
    type: ActionTypes.GET_ALL_PROJECT_FAILURE,
    error
  }
}

export function isOnEditProjectScreen(isEditProject: boolean) {
  return {
    type: ActionTypes.USER_IS_ON_UPDATE_SCREEN,
    payload: isEditProject
  }
}

export function requestGetProjectDetails(
  account: Account,
  projectId: string | undefined
) {
  return {
    type: ActionTypes.GET_PROJECT_DETAILS_REQUEST,
    account,
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
  account: Account,
  projectdata: Object | undefined
) {
  return {
    type: ActionTypes.UPDATE_PROJECT_DETAILS_REQUEST,
    account,
    projectdata
  }
}

export function updateProjectDetailsSuccess() {
  return {
    type: ActionTypes.UPDATE_PROJECT_DETAILS_SUCCESS
  }
}
export function updateProjectDetailsFailure(error: string) {
  return {
    type: ActionTypes.UPDATE_PROJECT_DETAILS_FAILURE,
    error
  }
}
