import { all, call, put, select, take, takeLatest } from 'redux-saga/effects'
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
  deleteProjectSuccess
} from '../actions/projectActions'
import { Account, Project } from '../utils/Interface'
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
import { GetProjectParams } from 'utils/Interface/api'

type Params = { newProjectData: Project; type: string; account: Account }
type GetParams = {
  type: string
  projectId: string
  projectdata: Project
  accountId: string
  params: Partial<GetProjectParams>
}

function* createNewProject({ newProjectData }: Params) {
  try {
    const account = yield select((state: ReduxState) => state.auth.account)
    const response = yield call(
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
    const account = yield select((state) => state.auth.account)
    const response = yield call(getAllProjects, account)
    yield put(getAllProjectsSuccess(response))
  } catch (error: any) {
    yield put(getAllProjectsFailure(error?.message || 'default'))
  }
}

function* getProjectsSaga({ params }: GetParams) {
  try {
    const account = yield select((state) => state.auth.account)
    const response = yield call(getProjects, account, params)
    // yield put(getAllProjectsRequestSuccess(response))
  } catch (error) {
    // yield put(getAllProjectsRequestFailure(error?.message || 'default'))
  }
}

function* getProjectDetails({ projectId, accountId }: GetParams) {
  try {
    const response = yield call(getProject, accountId, projectId)

    yield put(getProjectDetailsSuccess(response ? response : {}))
  } catch (error: any) {
    yield put(getProjectDetailsFailure(error?.message || 'default'))
  }
}

function* updateProjectDetails({ projectdata }: GetParams) {
  try {
    const account = yield select((state) => state.auth.account)
    yield call(updateProjectDetailsRequest, account, projectdata)
    yield put(updateProjectDetailsSuccess(projectdata))
  } catch (error: any) {
    yield put(updateProjectDetailsFailure(error?.message || 'default'))
  }
}

function* deletingProjectSaga({ projectId }: GetParams) {
  try {
    const account = yield select((state) => state.auth.account)
    yield call(deleteProject, projectId, account)
    yield put(deleteProjectSuccess(projectId))
  } catch (error: any) {
    yield put(deleteProjectFailure(error, projectId))
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
  yield takeLatest(ActionTypes.GET_PROJECTS, getProjectsSaga)
}

export default function* sagas() {
  yield all([watchGetRequest()])
}
