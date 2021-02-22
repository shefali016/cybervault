import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import * as Types from '../utils/Interface'
import * as ActionTypes from '../actions/actionTypes'
import { ReduxState } from 'reducers/rootReducer'
import {
  updatePortfolioFolderRequest,
  getPortfolioFolderRequest,
  deletePortfolioFolderRequest,
  updatePortfolioRequest,
  getPortfolioRequest
} from '../apis/portfolioRequest'
import {
  deletePortfolioFolderFailure,
  getPortfolioFolderSuccess,
  updatePortfolioFolderFailure,
  updatePortfolioFolderSuccess,
  deletePortfolioFolderSuccess,
  updatePortfolioSuccess,
  updatePortfolioFailure,
  getPortfolioSuccess
} from '../actions/portfolioActions'
import history from 'services/history'
type UpdateParams = {
  type: string
  account: Account
  folder: Types.PortfolioFolder
  folderId: string
  portfolio: Types.Portfolio
  portfolioId: string
}

function* getPortfolioFolders() {
  try {
    const account: Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const result: Object | any = yield call(getPortfolioFolderRequest, account)

    yield put(getPortfolioFolderSuccess(result.folderList, result.portfolios))
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
    yield put(deletePortfolioFolderFailure(error))
    throw (Error = error)
  }
}

function* updatePortfolio({ portfolio, folderId }: UpdateParams) {
  try {
    const account: Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const folderArray: Array<Types.PortfolioFolder> = yield select(
      (state: ReduxState) => state.portfolio.folders
    )
    const portfolioId: string = yield call(
      updatePortfolioRequest,
      portfolio,
      account
    )
    const folder: Types.PortfolioFolder | any = folderArray.filter(
      (item: any) => item.id === folderId
    )[0]
   
    folder.portfolios.push(portfolioId)

    yield call(updatePortfolioFolderRequest, folder, account)
    history.push(`/portfolio/${portfolioId}`)
    yield put(updatePortfolioSuccess())
  } catch (error: any) {
    yield put(updatePortfolioFailure(error))
    throw (Error = error)
  }
}

function* getPortfolio({ portfolioId }: UpdateParams) {
  try {
    const account: Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const result: Object | any = yield call(
      getPortfolioRequest,
      portfolioId,
      account
    )
    console.log('>>>>>>>>>>>>>>>Result', result)

    console.log('>>>>>>>>>>>>>>>>>Result', result)
    yield put(getPortfolioSuccess(result.portfolio, result.projectDataList))
  } catch (error: any) {
    yield put(updatePortfolioFolderFailure(error))
  }
}

function* watchGetRequest() {
  yield takeLatest(ActionTypes.UPDATE_PORTFOLIO_FOLDER, updatePortfolioFolder)
  yield takeLatest(ActionTypes.DELETE_PORTFOLIO_FOLDER, deletePortfolioFolder)
  yield takeLatest(
    ActionTypes.GET_PORTFOLIO_FOLDER_REQUEST,
    getPortfolioFolders
  )
  yield takeLatest(ActionTypes.UPDATE_PORTFOLIO, updatePortfolio)
  yield takeLatest(ActionTypes.GET_PORTFOLIO_REQUEST, getPortfolio)
}

export default function* sagas() {
  yield all([watchGetRequest()])
}
