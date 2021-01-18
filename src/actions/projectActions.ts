import * as ActionTypes from './actionTypes'
import * as Types from '../utils/types'

export function createNewProjectRequest(
  newProjectData: Types.Project,
  account: Account
) {
  return {
    type: ActionTypes.NEW_PROJECT_REQUEST,
    newProjectData,
    account
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

export function getAllProjectsRequest(account: Account) {
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
