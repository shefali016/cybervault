import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import * as Types from '../utils/Interface'
import * as ActionTypes from '../actions/actionTypes'
import { ReduxState } from 'reducers/rootReducer'
import {
  updatePortfolioFolderRequest,
  getPortfolioFolderRequest,
  deletePortfolioFolderRequest,
  updatePortfolioRequest,
  getPortfolioRequest,
  sharePortfolio
} from '../apis/portfolioRequest'
import {
  deletePortfolioFolderFailure,
  getPortfolioFolderSuccess,
  updatePortfolioFolderFailure,
  updatePortfolioFolderSuccess,
  deletePortfolioFolderSuccess,
  updatePortfolioSuccess,
  updatePortfolioFailure,
  getPortfolioSuccess,
  sharePortfolioFailure,
  sharePortfolioSuccess
} from '../actions/portfolioActions'
import history from 'services/history'
import { PortfolioFolderCache } from '../utils/Interface'

type Params = {
  type: string
  account: Account
  folder: Types.PortfolioFolder
  folderId: string
  portfolio: Types.Portfolio
  portfolioId: string
  contentDesc: string
  email: string
}

function* getPortfolioFolders() {
  try {
    const account: Types.Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const result = yield call(getPortfolioFolderRequest, account)

    const { folderList, portfolios, folderCache, portfolioCache } = result

    yield put(
      getPortfolioFolderSuccess(
        folderList,
        portfolios,
        folderCache,
        portfolioCache
      )
    )
  } catch (error: any) {
    yield put(updatePortfolioFolderFailure(error))
  }
}

function* updatePortfolioFolder({ folder }: Params) {
  try {
    const account: Types.Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const folderData = yield call(updatePortfolioFolderRequest, folder, account)
    const folderId: string = folder.id
    yield put(updatePortfolioFolderSuccess(folderId, folderData))
  } catch (error: any) {
    yield put(updatePortfolioFolderFailure(error))
  }
}

function* deletePortfolioFolder({ folderId }: Params) {
  try {
    const account: Types.Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    yield call(deletePortfolioFolderRequest, folderId, account)

    yield put(deletePortfolioFolderSuccess(folderId))
  } catch (error: any) {
    yield put(deletePortfolioFolderFailure(error))
  }
}

function* updatePortfolio({ portfolio }: Params) {
  try {
    const account: Types.Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const folderCache: PortfolioFolderCache = yield select(
      (state: ReduxState) => state.portfolio.folderCache
    )
    const portfolioId: string = yield call(
      updatePortfolioRequest,
      portfolio,
      account
    )
    const folder: Types.PortfolioFolder = folderCache[portfolio.folderId]

    if (!folder.portfolios.includes(portfolioId)) {
      // Portfolio has not been added to folder
      // Add to folder and save to firestore
      folder.portfolios = [...folder.portfolios, portfolioId]
      yield call(updatePortfolioFolderRequest, folder, account)
    }

    history.push(`/portfolio/${portfolioId}`)
    yield put(updatePortfolioSuccess(folder, portfolio))
  } catch (error: any) {
    yield put(updatePortfolioFailure(error || 'default'))
  }
}

function* getPortfolio({ portfolioId }: Params) {
  try {
    const account: Types.Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const result: Object | any = yield call(
      getPortfolioRequest,
      portfolioId,
      account.id
    )

    yield put(getPortfolioSuccess(result.portfolio, result.projectDataList))
  } catch (error: any) {
    yield put(updatePortfolioFolderFailure(error))
  }
}

function* sharePortfolioSaga({ portfolio, contentDesc, email }: Params) {
  try {
    const account: Types.Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    yield call(
      sharePortfolio,
      portfolio,
      contentDesc,
      account,
      account.branding,
      email
    )
    yield put(sharePortfolioSuccess())
  } catch (error) {
    yield put(sharePortfolioFailure(error || 'default'))
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
  yield takeLatest(ActionTypes.SHARE_PORTFOLIO, sharePortfolioSaga)
}

export default function* sagas() {
  yield all([watchGetRequest()])
}
