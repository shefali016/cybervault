import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import * as Types from '../utils/Interface'
import * as ActionTypes from '../actions/actionTypes'
import { ReduxState } from 'reducers/rootReducer'
import {
  deletePortfolioFolderRequest,
  getPortfolioFolderRequest,
  updatePortfolioFolderRequest
} from '../apis/portfolioRequest'
import {
  deletePortfolioFolderFailure,
  getPortfolioFolderSuccess,
  updatePortfolioFolderFailure,
  updatePortfolioFolderSuccess,
  deletePortfolioFolderSuccess
} from '../actions/portfolioActions'
type UpdateParams = {
  type: string
  account: Account
  folder: Types.PortfolioFolder
  folderId: string
}

function* getPortfolioFolders() {
  try {
    const account: Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const folderList: Array<Types.PortfolioFolder> = yield call(
      getPortfolioFolderRequest,
      account
    )

    yield put(getPortfolioFolderSuccess(folderList))
  } catch (error: any) {
    yield put(updatePortfolioFolderFailure(error))
  }
}

function* updatePortfolioFolder({ folder }: UpdateParams) {
  try {
    const account: Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const folderData = yield call(updatePortfolioFolderRequest, folder, account)
    const folderId: string = folder.id
    yield put(updatePortfolioFolderSuccess(folderId, folderData))
  } catch (error: any) {
    console.log('>>>>>>>>>>>>>>Errror', error)
    yield put(updatePortfolioFolderFailure(error))
    throw (Error = error)
  }
}

function* deletePortfolioFolder({ folderId }: UpdateParams) {
  try {
    const account: Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    yield call(deletePortfolioFolderRequest, folderId, account)

    yield put(deletePortfolioFolderSuccess(folderId))
  } catch (error: any) {
    console.log('>>>>>>>>>>>>>>Errror', error)
    yield put(deletePortfolioFolderFailure(error))
    throw (Error = error)
  }
}

function* watchGetRequest() {
  yield takeLatest(ActionTypes.UPDATE_PORTFOLIO_FOLDER, updatePortfolioFolder)
  yield takeLatest(ActionTypes.DELETE_PORTFOLIO_FOLDER, deletePortfolioFolder)
  yield takeLatest(
    ActionTypes.GET_PORTFOLIO_FOLDER_REQUEST,
    getPortfolioFolders
  )
}

export default function* sagas() {
  yield all([watchGetRequest()])
}
