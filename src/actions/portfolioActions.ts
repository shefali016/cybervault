import * as ActionTypes from './actionTypes'
import * as Types from '../utils/Interface'

export function updatePortfolioFolderRequest(folder: Types.PortfolioFolder) {
  return {
    type: ActionTypes.UPDATE_PORTFOLIO_FOLDER,
    folder
  }
}

export function updatePortfolioFolderSuccess(
  folder: Array<Types.PortfolioFolder>
) {
  return {
    type: ActionTypes.UPDATE_PORTFOLIO_FOLDER_SUCCESS,
    payload: folder
  }
}

export function updatePortfolioFolderFailure(error: string) {
  return {
    type: ActionTypes.UPDATE_PROJECT_DETAILS_FAILURE,
    error
  }
}

export function getPortfolioFolderRequest() {
  return {
    type: ActionTypes.GET_PORTFOLIO_FOLDER_REQUEST
  }
}

export function getPortfolioFolderSuccess(
  folderList: Array<Types.PortfolioFolder>
) {
  return {
    type: ActionTypes.GET_PORTFOLIO_FOLDER_SUCCESS,
    payload: folderList
  }
}

export function getPortfolioFolderFailure(error: string) {
  return {
    type: ActionTypes.GET_PORTFOLIO_FOLDER_FAILURE,
    error
  }
}

export function deletePortfolioFolderRequest(folderId: string) {
  return {
    type: ActionTypes.DELETE_PORTFOLIO_FOLDER,
    folderId
  }
}

export function deletePortfolioFolderSuccess(
  folder: Array<Types.PortfolioFolder>
) {
  return {
    type: ActionTypes.DELETE_PORTFOLIO_FOLDER_SUCCESS,
    payload: folder
  }
}

export function deletePortfolioFolderFailure(error: string) {
  return {
    type: ActionTypes.DELETE_PORTFOLIO_FOLDER_FAILURE,
    error
  }
}
