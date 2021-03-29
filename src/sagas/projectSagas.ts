import {
  all,
  call,
  put,
  select,
  takeLatest,
  takeEvery
} from 'redux-saga/effects'
import {
  createNewProjectSuccess,
  createNewProjectFailure,
  getAllProjectsSuccess,
  getAllProjectsFailure,
  getProjectDetailsSuccess,
  getProjectDetailsFailure,
  updateProjectDetailsSuccess,
  updateProjectDetailsFailure,
  deleteProjectFailure,
  deleteProjectSuccess,
  getAssetListSuccess,
  getAssetListFailure,
  deleteAssetSuccess,
  deleteAssetFailure,
  getProjectsSuccess,
  getProjectsFailure
} from '../actions/projectActions'
import { Account, Asset, Project } from '../utils/Interface'
import * as ActionTypes from '../actions/actionTypes'
import {
  createNewProjectRequest,
  deleteProject,
  getAllProjects,
  getProject,
  updateProjectDetailsRequest,
  getProjects
} from '../apis/projectRequest'
import { ReduxState } from 'reducers/rootReducer'
import { deleteAsset, getAllAssets } from 'apis/assets'
import { GetParams } from 'utils/Interface/api'
import { ProjectFilters } from 'utils/enums'

type Params = { newProjectData: Project; type: string; account: Account }
type ActionParams = {
  type: string
  projectId: string
  assetId: string
  projectdata: Project
  accountId: string
  params: Partial<GetParams>
  filter: ProjectFilters
}

function* createNewProject({ newProjectData }: Params) {
  try {
    const account: Account = yield select(
      (state: ReduxState) => state.auth.account
    )
    const response: Project = yield call(
      createNewProjectRequest,
      newProjectData,
      account
    )
    yield put(createNewProjectSuccess(response))
  } catch (error: any) {
    yield put(createNewProjectFailure(error?.message || 'default'))
  }
}

function* getAllProjectsSaga() {
  try {
    const account: Account = yield select((state) => state.auth.account)
    const response: Project[] = yield call(getAllProjects, account)
    yield put(getAllProjectsSuccess(response))
  } catch (error: any) {
    yield put(getAllProjectsFailure(error?.message || 'default'))
  }
}

function* getProjectsSaga({ params, filter }: ActionParams) {
  try {
    const account: Account = yield select((state) => state.auth.account)
    const response: Project[] = yield call(getProjects, account, params)
    yield put(getProjectsSuccess(response, filter))
  } catch (error) {
    yield put(getProjectsFailure(error?.message || 'default', filter))
  }
}

function* getProjectDetails({ projectId, accountId }: ActionParams) {
  try {
    const response: Project = yield call(getProject, accountId, projectId)

    yield put(getProjectDetailsSuccess(response ? response : {}))
  } catch (error: any) {
    yield put(getProjectDetailsFailure(error?.message || 'default'))
  }
}

function* updateProjectDetails({ projectdata }: ActionParams) {
  try {
    const account: Account = yield select((state) => state.auth.account)
    yield call(updateProjectDetailsRequest, account, projectdata)
    yield put(updateProjectDetailsSuccess(projectdata))
  } catch (error: any) {
    yield put(updateProjectDetailsFailure(error?.message || 'default'))
  }
}

function* deletingProjectSaga({ projectId }: ActionParams) {
  try {
    const account: Account = yield select((state) => state.auth.account)
    yield call(deleteProject, projectId, account)
    yield put(deleteProjectSuccess(projectId))
  } catch (error: any) {
    yield put(deleteProjectFailure(error, projectId))
  }
}

function* getAllAssetList() {
  try {
    const accountId: string = yield select((state) => state.auth.account.id)
    const assetList: Asset[] = yield call(getAllAssets, accountId)
    yield put(getAssetListSuccess(assetList))
  } catch (error: any) {
    yield put(getAssetListFailure(error?.message || 'default'))
  }
}

function* deleteAssetData({ assetId, projectId }: ActionParams) {
  try {
    const accountId: string = yield select((state) => state.auth.account.id)
    yield call(deleteAsset, accountId, assetId)
    yield put(deleteAssetSuccess(assetId, projectId))
  } catch (error: any) {
    yield put(deleteAssetFailure(error?.message || 'default'))
  }
}

function* watchGetRequest() {
  yield takeLatest(ActionTypes.NEW_PROJECT_REQUEST, createNewProject)
  yield takeLatest(ActionTypes.GET_ALL_PROJECT_REQUEST, getAllProjectsSaga)
  yield takeLatest(ActionTypes.GET_PROJECT_DETAILS_REQUEST, getProjectDetails)
  yield takeLatest(
    ActionTypes.UPDATE_PROJECT_DETAILS_REQUEST,
    updateProjectDetails
  )
  yield takeLatest(ActionTypes.DELETE_PROJECT_REQUEST, deletingProjectSaga)
  yield takeLatest(ActionTypes.GET_ASSET_LIST, getAllAssetList)
  yield takeLatest(ActionTypes.DELETE_ASSET, deleteAssetData)
  yield takeEvery(ActionTypes.GET_PROJECTS, getProjectsSaga)
}

export default function* sagas() {
  yield all([watchGetRequest()])
}
