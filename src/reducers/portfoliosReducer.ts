import {
  DELETE_PORTFOLIO_FOLDER,
  DELETE_PORTFOLIO_FOLDER_SUCCESS,
  GET_PORTFOLIO_FOLDER_REQUEST,
  GET_PORTFOLIO_FOLDER_SUCCESS,
  UPDATE_PORTFOLIO_FOLDER,
  UPDATE_PORTFOLIO_FOLDER_SUCCESS
} from 'actions/actionTypes'
import * as Types from '../utils/types'

export type State = {
  folders?: Array<Types.PortfolioFolder>
  portfolios?: Map<string, Types.Portfolio> | any
  loading: boolean
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
  loading: false,
  error: '',
  updatingFolder: false
}

const getPrortfolioFolders = (state: State, action: Action) => ({
  ...state,
  loading: true,
  updatingFolder: false
})

const getPrortfolioFoldersSuccess = (state: State, action: Action) => ({
  ...state,
  loading: false,
  folders: action.payload,
  updatingFolder: false
})

const updatePrortfolioFolder = (state: State, action: Action) => ({
  ...state,
  updatingFolder: true,
  loading: true
})
const updatePrortfolioFoldersSuccess = (state: State, action: Action) => ({
  ...state,
  updatingFolder: false,
  loading: false,
  folders: action.payload
})

const deletePrortfolioFolder = (state: State, action: Action) => ({
  ...state,
  loading: true
})
const deletePrortfolioFoldersSuccess = (state: State, action: Action) => ({
  ...state,
  loading: false,
  folders: action.payload
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
    default:
      return state
  }
}

export default portfoliosReducer
