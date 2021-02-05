import {
  DELETE_PORTFOLIO_FOLDER,
  DELETE_PORTFOLIO_FOLDER_SUCCESS,
  GET_PORTFOLIO_FOLDER_REQUEST,
  GET_PORTFOLIO_FOLDER_SUCCESS,
  GET_PORTFOLIO_REQUEST,
  GET_PORTFOLIO_SUCCESS,
  UPDATE_PORTFOLIO,
  UPDATE_PORTFOLIO_FOLDER,
  UPDATE_PORTFOLIO_FOLDER_SUCCESS,
  UPDATE_PORTFOLIO_SUCCESS
} from 'actions/actionTypes'
import * as Types from '../utils/Interface'

export type State = {
  folders: Array<Types.PortfolioFolder | never>
  portfolios: { [id: string]: Types.Portfolio }
  getFoldersLoading: boolean
  getPortfolioLoading: boolean
  updatingFolder: boolean
  getFoldersError: string | null
  portfolio: Types.Portfolio | any
  portfolioProjects: Array<Types.Project>
}

export type Action = {
  type: string
  payload: {}
  getFoldersError: string
  portfolios: Map<string, Types.Portfolio>
  folder: Types.PortfolioFolder
  projects?: Array<Types.Project>
}

const initialState = {
  folders: [],
  portfolios: {},
  getFoldersLoading: false,
  error: '',
  updatingFolder: false,
  getPortfolioLoading: false,
  getFoldersError: '',
  portfolio: {},
  portfolioProjects: []
}

const getPrortfolioFolders = (state: State, action: Action) => ({
  ...state,
  getFoldersLoading: true,
  updatingFolder: false
})

const getPrortfolioFoldersSuccess = (state: State, action: Action) => ({
  ...state,
  getFoldersLoading: false,
  folders: action.payload,
  portfolios: action.portfolios,
  updatingFolder: false
})

const updatePrortfolioFolder = (state: State, action: Action) => ({
  ...state,
  updatingFolder: true,
  getFoldersLoading: true
})
const updatePrortfolioFoldersSuccess = (state: State, action: Action) => {
  let folders: Array<Types.PortfolioFolder> | any = state.folders

  const folderIndex: number = state.folders.findIndex(
    (data: any) => data.id === action.payload
  )
  const folder: Types.PortfolioFolder = action.folder
  if (folderIndex > -1) {
    folders.splice(folderIndex, 1, folder)
  } else {
    folders.push(folder)
  }

  return {
    ...state,
    updatingFolder: false,
    getFoldersLoading: false,
    folders
  }
}

const deletePrortfolioFolder = (state: State, action: Action) => ({
  ...state,
  getFoldersLoading: true
})
const deletePrortfolioFoldersSuccess = (
  state: State,
  action: Action,
  folderList: Array<Types.PortfolioFolder>
) => ({
  ...state,
  getFoldersLoading: false,
  folders: folderList
})

const updatePrortfolio = (state: State, action: Action) => ({
  ...state,
  getPortfolioLoading: true
})
const updatePrortfolioSuccess = (state: State, action: Action) => ({
  ...state,
  getPortfolioLoading: false
})

const getPrortfolio = (state: State, action: Action) => ({
  ...state,
  getPortfolio: true
})

const getPrortfolioSuccess = (state: State, action: Action) => ({
  ...state,
  getPortfolio: false,
  portfolio: action.payload,
  portfolioProjects: action.projects
})
const portfoliosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_PORTFOLIO_FOLDER_REQUEST:
      return getPrortfolioFolders(state, action)
    case GET_PORTFOLIO_FOLDER_SUCCESS:
      return getPrortfolioFoldersSuccess(state, action)
    case UPDATE_PORTFOLIO_FOLDER:
      return updatePrortfolioFolder(state, action)
    case UPDATE_PORTFOLIO_FOLDER_SUCCESS:
      return updatePrortfolioFoldersSuccess(state, action)
    case DELETE_PORTFOLIO_FOLDER:
      return deletePrortfolioFolder(state, action)
    case DELETE_PORTFOLIO_FOLDER_SUCCESS:
      let currentFolder: Array<Types.PortfolioFolder> = state.folders
      const folderList: Array<Types.PortfolioFolder> = currentFolder.filter(
        (data: any) => data.id !== action.payload
      )
      return deletePrortfolioFoldersSuccess(state, action, folderList)
    case UPDATE_PORTFOLIO:
      return updatePrortfolio(state, action)
    case UPDATE_PORTFOLIO_SUCCESS:
      return updatePrortfolioSuccess(state, action)
    case GET_PORTFOLIO_REQUEST:
      return getPrortfolio(state, action)
    case GET_PORTFOLIO_SUCCESS:
      return getPrortfolioSuccess(state, action)
    default:
      return state
  }
}

export default portfoliosReducer
