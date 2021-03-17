import { all, call, put, select, take, takeLatest } from 'redux-saga/effects'
import {
  createNewProjectSuccess,
  createNewProjectFailure,
  getAllProjectsRequestSuccess,
  getAllProjectsRequestFailure,
  getProjectDetailsSuccess,
  getProjectDetailsFailure,
  updateProjectDetailsSuccess,
  updateProjectDetailsFailure,
  deleteProjectFailure,
  deleteProjectSuccess
} from '../actions/projectActions'
import * as Types from '../utils/Interface'
import * as ActionTypes from '../actions/actionTypes'
import {
  createNewProjectRequest,
  deleteProject,
  getAllProjectsRequest,
  getProject,
  updateProjectDetailsRequest
} from '../apis/projectRequest'
import { ReduxState } from 'reducers/rootReducer'

type Params = { newProjectData: Types.Project; type: string; account: Account }
type GetParams = {
  type: string
  projectId: string
  projectdata: Types.Project
  accountId:string
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

function* getAllProjects() {
  try {
    const account = yield select((state) => state.auth.account)
    const response = yield call(getAllProjectsRequest, account)
    yield put(getAllProjectsRequestSuccess(response))
  } catch (error: any) {
    yield put(getAllProjectsRequestFailure(error?.message || 'default'))
  }
}

function* getProjectDetails({ projectId,accountId }: GetParams) {
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
  yield takeLatest(ActionTypes.GET_ALL_PROJECT_REQUEST, getAllProjects)
  yield takeLatest(ActionTypes.GET_PROJECT_DETAILS_REQUEST, getProjectDetails)
  yield takeLatest(
    ActionTypes.UPDATE_PROJECT_DETAILS_REQUEST,
    updateProjectDetails
  )
  yield takeLatest(ActionTypes.DELETE_PROJECT_REQUEST, deletingProjectSaga)
}

export default function* sagas() {
  yield all([watchGetRequest()])
}
