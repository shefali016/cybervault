import * as ActionTypes from './actionTypes'
import * as Types from '../utils/Interface'

export function updatePortfolioFolderRequest(folder: Types.PortfolioFolder) {
  return {
    type: ActionTypes.UPDATE_PORTFOLIO_FOLDER,
    folder
  }
}

export function updatePortfolioFolderSuccess(
  folderId: string,
  folder: Types.PortfolioFolder
) {
  return {
    type: ActionTypes.UPDATE_PORTFOLIO_FOLDER_SUCCESS,
    payload: folderId,
    folder
  }
}

export function updatePortfolioFolderFailure(error: string) {
  return {
    type: ActionTypes.UPDATE_PORTFOLIO_FOLDER_FAILURE,
    error
  }
}

export function getPortfolioFolderRequest() {
  return {
    type: ActionTypes.GET_PORTFOLIO_FOLDER_REQUEST
  }
}

export function getPortfolioFolderSuccess(
  folderList: Array<Types.PortfolioFolder>,
  portfolios: Map<string, Types.Portfolio>,
  folderCache: Types.PortfolioFolderCache,
  portfolioCache: Types.PortfolioCache
) {
  return {
    type: ActionTypes.GET_PORTFOLIO_FOLDER_SUCCESS,
    payload: folderList,
    portfolios,
    folderCache,
    portfolioCache
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

export function deletePortfolioFolderSuccess(folderId: string) {
  return {
    type: ActionTypes.DELETE_PORTFOLIO_FOLDER_SUCCESS,
    payload: folderId
  }
}

export function deletePortfolioFolderFailure(error: string) {
  return {
    type: ActionTypes.DELETE_PORTFOLIO_FOLDER_FAILURE,
    error
  }
}

/* Portfolio Requests Action */
export function updatePortfolioRequest(portfolio: Types.Portfolio) {
  return {
    type: ActionTypes.UPDATE_PORTFOLIO,
    portfolio
  }
}

export function updatePortfolioSuccess(
  folder: Types.PortfolioFolder,
  portfolio: Types.Portfolio
) {
  return {
    type: ActionTypes.UPDATE_PORTFOLIO_SUCCESS,
    folder,
    portfolio
  }
}

export function updatePortfolioFailure(error: string) {
  return {
    type: ActionTypes.UPDATE_PORTFOLIO_FAILURE,
    error
  }
}
/* GET PORTFOLIO REQUEST ACTIONS */
export function getPortfolioRequest(portfolioId: string) {
  return {
    type: ActionTypes.GET_PORTFOLIO_REQUEST,
    portfolioId
  }
}

export function getPortfolioSuccess(
  portfolio: Types.Portfolio,
  projects: Array<Types.Project>
) {
  return {
    type: ActionTypes.GET_PORTFOLIO_SUCCESS,
    payload: portfolio,
    projects
  }
}

export function getPortfolioFailure(error: string) {
  return {
    type: ActionTypes.GET_PORTFOLIO_FAILURE,
    error
  }
}

export const requestSharePortfolio = (
  portfolio: Types.Portfolio,
  contentDesc: string,
  email: string
) => ({ type: ActionTypes.SHARE_PORTFOLIO, portfolio, contentDesc, email })

export const sharePortfolioSuccess = () => ({
  type: ActionTypes.SHARE_PORTFOLIO_SUCCESS
})

export const sharePortfolioFailure = (error: string) => ({
  type: ActionTypes.SHARE_PORTFOLIO_FAILURE,
  error
})
