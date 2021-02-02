import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as Types from '../utils/types'
import * as ActionTypes from '../actions/actionTypes'
import { ReduxState } from 'reducers/rootReducer'
import {
  updatePortfolioFolderApi,
  getPortfolioFolderApi,
  deletePortfolioFolderApi,
  updatePortfolioRequest
} from '../apis/portfolioRequest'
import {
  deletePortfolioFolderFailure,
  getPortfolioFolderSuccess,
  updatePortfolioFolderFailure,
  updatePortfolioFolderSuccess,
  deletePortfolioFolderSuccess,
  updatePortfolioSuccess,
  updatePortfolioFailure
} from '../actions/portfolioActions'
import history from 'services/history'
type UpdateParams = {
  type: string
  account: Account
  folder: Types.PortfolioFolder
  folderId: string
  portfolio: Types.Portfolio
}

function* getPortfolioFolders() {
  try {
    const account: Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const folderList: Array<Types.PortfolioFolder> = yield call(
      getPortfolioFolderApi,
      account
    )

    yield put(getPortfolioFolderSuccess(folderList))
  } catch (error: any) {
    yield put(updatePortfolioFolderFailure(error))
  }
}

function* updatePortfolioFolder({ folder }: UpdateParams) {
  try {
    const folderArray: Array<Types.PortfolioFolder> | any = yield select(
      (state: ReduxState) => state.portfolio.folders
    )
    const account: Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const folderData = yield call(updatePortfolioFolderApi, folder, account)
    const folderIndex: number = folderArray.findIndex(
      (data: any) => data.id === folder.id
    )
    if (folderIndex > -1) {
      folderArray.splice(folderIndex, 1, folder)
    } else {
      folderArray.push(folderData)
    }

    yield put(updatePortfolioFolderSuccess(folderArray))
  } catch (error: any) {
    console.log('>>>>>>>>>>>>>>Errror', error)
    yield put(updatePortfolioFolderFailure(error))
    throw (Error = error)
  }
}

function* deletePortfolioFolder({ folderId }: UpdateParams) {
  try {
    const folderArray: Array<Types.PortfolioFolder> | any = yield select(
      (state: ReduxState) => state.portfolio.folders
    )
    const account: Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    yield call(deletePortfolioFolderApi, folderId, account)
    const folderList: Array<Types.PortfolioFolder> = folderArray.filter(
      (data: any) => data.id !== folderId
    )

    yield put(deletePortfolioFolderSuccess(folderList))
  } catch (error: any) {
    console.log('>>>>>>>>>>>>>>Errror', error)
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
    const folderPortfolios: Array<string> = []
    if (folder.portfolios && folder.portfolios.length) {
      for (let index = 0; index < folder.portfolios.length; index++) {
        const portfolios = folder.portfolios[index]
        if (portfolios.id) {
          folderPortfolios.push(portfolios.id, portfolioId)
        }
      }
    } else {
      folderPortfolios.push(portfolioId)
    }
    const folderData = {
      ...folder,
      portfolios: folderPortfolios
    }
    yield call(updatePortfolioFolderApi, folderData, account)
    history.push(`/portfolio/${portfolioId}`)
    // yield put(push(`/portfolio/${portfolioId}`))
    yield put(updatePortfolioSuccess(portfolio))
  } catch (error: any) {
    console.log('>>>>>>>>>>>>>>Errror', error)
    yield put(updatePortfolioFailure(error))
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
  yield takeLatest(ActionTypes.UPDATE_PORTFOLIO, updatePortfolio)
}

export default function* sagas() {
  yield all([watchGetRequest()])
}
