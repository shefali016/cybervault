import {
  DELETE_PORTFOLIO_FOLDER,
  DELETE_PORTFOLIO_FOLDER_SUCCESS,
  GET_PORTFOLIO_FOLDER_REQUEST,
  GET_PORTFOLIO_FOLDER_SUCCESS,
  UPDATE_PORTFOLIO,
  UPDATE_PORTFOLIO_FOLDER,
  UPDATE_PORTFOLIO_FOLDER_SUCCESS,
  UPDATE_PORTFOLIO_SUCCESS
} from 'actions/actionTypes'
import * as Types from '../utils/types'

export type State = {
  folders?: Array<Types.PortfolioFolder>
  portfolios?: Map<string, Types.Portfolio> | any
  getFoldersLoading: boolean
  getPortfolioLoading: boolean
  updatingFolder: boolean
  error: string | null
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
  folders: [],
  portfolios: [],
  getFoldersLoading: false,
  error: '',
  updatingFolder: false,
  getPortfolioLoading: false
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
  updatingFolder: false
})

const updatePrortfolioFolder = (state: State, action: Action) => ({
  ...state,
  updatingFolder: true,
  getFoldersLoading: true
})
const updatePrortfolioFoldersSuccess = (state: State, action: Action) => ({
  ...state,
  updatingFolder: false,
  getFoldersLoading: false,
  folders: action.payload
})

const deletePrortfolioFolder = (state: State, action: Action) => ({
  ...state,
  getFoldersLoading: true
})
const deletePrortfolioFoldersSuccess = (state: State, action: Action) => ({
  ...state,
  getFoldersLoading: false,
  folders: action.payload
})

const updatePrortfolio = (state: State, action: Action) => ({
  ...state,
  getPortfolioLoading: true
})
const updatePrortfolioSuccess = (state: State, action: Action) => ({
  ...state,
  getPortfolioLoading: false
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
      return deletePrortfolioFoldersSuccess(state, action)
    case UPDATE_PORTFOLIO:
      return updatePrortfolio(state, action)
    case UPDATE_PORTFOLIO_SUCCESS:
      return updatePrortfolioSuccess(state, action)
    default:
      return state
  }
}

export default portfoliosReducer
