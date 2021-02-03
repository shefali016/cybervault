import {
  DELETE_PORTFOLIO_FOLDER,
  DELETE_PORTFOLIO_FOLDER_SUCCESS,
  GET_PORTFOLIO_FOLDER_REQUEST,
  GET_PORTFOLIO_FOLDER_SUCCESS,
  UPDATE_PORTFOLIO_FOLDER,
  UPDATE_PORTFOLIO_FOLDER_SUCCESS
} from 'actions/actionTypes'
import { Type } from 'typescript'
import * as Types from '../utils/Interface'

export type State = {
  folders?: Array<Types.PortfolioFolder>
  portfolios?: Map<string, Types.Portfolio> | any
  getFoldersLoading: boolean
  updatingFolder: boolean
  getFoldersError: string | null
}

export type Action = {
  type: string
  payload: {}
  getFoldersError: string
  portfolios?: []
  folder?: {}
}

const initialState = {
  folders: [],
  portfolios: [],
  getFoldersLoading: false,
  getFoldersError: '',
  updatingFolder: false
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
const updatePrortfolioFoldersSuccess = (
  state: State,
  action: Action,
  folders: Array<Types.PortfolioFolder>
) => ({
  ...state,
  updatingFolder: false,
  getFoldersLoading: false,
  folders
})

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

const portfoliosReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_PORTFOLIO_FOLDER_REQUEST:
      return getPrortfolioFolders(state, action)
    case GET_PORTFOLIO_FOLDER_SUCCESS:
      return getPrortfolioFoldersSuccess(state, action)
    case UPDATE_PORTFOLIO_FOLDER:
      return updatePrortfolioFolder(state, action)
    case UPDATE_PORTFOLIO_FOLDER_SUCCESS:
      let currentFolders: Array<Types.PortfolioFolder> | any = state.folders
      {
        const folderIndex: number = state.folders.findIndex(
          (data: any) => data.id === action.payload
        )
        const folder: Types.PortfolioFolder | any = action.folder
        if (folderIndex > -1) {
          currentFolders.splice(folderIndex, 1, folder)
        } else {
          currentFolders.push(folder)
        }
      }
      return updatePrortfolioFoldersSuccess(state, action, currentFolders)
    case DELETE_PORTFOLIO_FOLDER:
      return deletePrortfolioFolder(state, action)
    case DELETE_PORTFOLIO_FOLDER_SUCCESS:
      let currentFolder: Array<Types.PortfolioFolder> = state.folders
      const folderList: Array<Types.PortfolioFolder> = currentFolder.filter(
        (data: any) => data.id !== action.payload
      )
      return deletePrortfolioFoldersSuccess(state, action, folderList)
    default:
      return state
  }
}

export default portfoliosReducer
