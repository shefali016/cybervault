import {
  DELETE_PORTFOLIO_FOLDER,
  DELETE_PORTFOLIO_FOLDER_SUCCESS,
  GET_PORTFOLIO_FOLDER_REQUEST,
  GET_PORTFOLIO_FOLDER_SUCCESS,
  GET_PORTFOLIO_REQUEST,
  GET_PORTFOLIO_SUCCESS,
  UPDATE_PORTFOLIO,
  UPDATE_PORTFOLIO_FAILURE,
  UPDATE_PORTFOLIO_FOLDER,
  UPDATE_PORTFOLIO_FOLDER_SUCCESS,
  UPDATE_PORTFOLIO_SUCCESS
} from 'actions/actionTypes'
import * as Types from '../utils/Interface'
import { Portfolio, PortfolioFolder } from '../utils/Interface'

export type State = {
  folders: Array<PortfolioFolder>
  portfolios: Array<Portfolio>

  folderCache: { [id: string]: PortfolioFolder }
  portfolioCache: { [id: string]: Portfolio }

  getFoldersLoading: boolean
  getPortfolioLoading: boolean
  updatingFolder: boolean
  getFoldersError: string | null
  portfolio: Types.Portfolio | any
  portfolioProjects: Array<Types.Project>
  updatePortfolioLoading: boolean
  updatePortfolioSuccess: boolean
  updatePortfolioError: string | null
}

export type Action = {
  type: string
  payload?: {}
  getFoldersError?: string
  portfolios?: Array<Types.Portfolio>
  folder: Types.PortfolioFolder
  projects?: Array<Types.Project>
  error?: string
  portfolioCache: Types.PortfolioCache
  folderCache: Types.PortfolioFolderCache
  portfolio: Types.Portfolio
}

const initialState = {
  folders: [],
  portfolios: [],
  getFoldersLoading: false,
  error: '',
  updatingFolder: false,
  getPortfolioLoading: false,
  getFoldersError: '',
  portfolio: {},
  portfolioProjects: [],

  folderCache: {},
  portfolioCache: {},

  updatePortfolioLoading: false,
  updatePortfolioSuccess: false,
  updatePortfolioError: null
}

const getPortfolioFolders = (state: State, action: Action) => ({
  ...state,
  getFoldersLoading: true,
  updatingFolder: false
})

const getPortfolioFoldersSuccess = (state: State, action: Action) => ({
  ...state,
  getFoldersLoading: false,
  folders: action.payload,
  portfolios: action.portfolios,
  folderCache: action.folderCache,
  portfolioCache: action.portfolioCache,
  updatingFolder: false
})

const updatePrortfolioFolder = (state: State, action: Action) => ({
  ...state,
  updatingFolder: true,
  getFoldersLoading: true
})

const updatePortfolioFoldersSuccess = (state: State, action: Action) => {
  const folder: Types.PortfolioFolder = action.folder

  let didReplace = false
  let folders = state.folders.map((f: Types.PortfolioFolder) => {
    if (f.id === folder.id) {
      didReplace = true
      return folder
    }
    return f
  })

  if (!didReplace) {
    folders = [folder, ...folders]
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

const updatePortfolio = (state: State, action: Action) => ({
  ...state,
  updatePortfolioLoading: true,
  updatePortfolioError: null,
  updatePortfolioSuccess: false
})
const updatePortfolioSuccess = (state: State, action: Action) => ({
  ...state,
  folderCache: { ...state.folderCache, [action.folder.id]: action.folder },
  portfolioCache: {
    ...state.portfolioCache,
    [action.portfolio.id]: action.portfolio
  },
  updatePortfolioLoading: false,
  updatePortfolioSuccess: true
})
const updatePortfolioFailure = (state: State, action: Action) => ({
  ...state,
  updatePortfolioLoading: false,
  updatePortfolioError: action.error
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
      return getPortfolioFolders(state, action)
    case GET_PORTFOLIO_FOLDER_SUCCESS:
      return getPortfolioFoldersSuccess(state, action)
    case UPDATE_PORTFOLIO_FOLDER:
      return updatePrortfolioFolder(state, action)
    case UPDATE_PORTFOLIO_FOLDER_SUCCESS:
      return updatePortfolioFoldersSuccess(state, action)
    case DELETE_PORTFOLIO_FOLDER:
      return deletePrortfolioFolder(state, action)
    case DELETE_PORTFOLIO_FOLDER_SUCCESS:
      let currentFolder: Array<Types.PortfolioFolder> = state.folders
      const folderList: Array<Types.PortfolioFolder> = currentFolder.filter(
        (data: any) => data.id !== action.payload
      )
      return deletePrortfolioFoldersSuccess(state, action, folderList)
    case UPDATE_PORTFOLIO:
      return updatePortfolio(state, action)
    case UPDATE_PORTFOLIO_SUCCESS:
      return updatePortfolioSuccess(state, action)
    case UPDATE_PORTFOLIO_FAILURE:
      return updatePortfolioFailure(state, action)
    case GET_PORTFOLIO_REQUEST:
      return getPrortfolio(state, action)
    case GET_PORTFOLIO_SUCCESS:
      return getPrortfolioSuccess(state, action)
    default:
      return state
  }
}

export default portfoliosReducer
