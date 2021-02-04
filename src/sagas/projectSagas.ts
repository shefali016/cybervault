import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import {
  createNewProjectSuccess,
  createNewProjectFailure,
  getAllProjectsRequestSuccess,
  getAllProjectsRequestFailure,
  getProjectDetailsSuccess,
  getProjectDetailsFailure,
  updateProjectDetailsSuccess,
  updateProjectDetailsFailure,
  requestGetProjectDetails
} from '../actions/projectActions'
import * as Types from '../utils/Interface'
import * as ActionTypes from '../actions/actionTypes'
import {
  createNewProjectRequest,
  getAllProjectsRequest,
  getProjectDetailsRequest,
  updateProjectDetailsRequest
} from '../apis/projectRequest'
import { ReduxState } from 'reducers/rootReducer'

type Params = { newProjectData: Types.Project; type: string; account: Account }
type GetParams = {
  type: string
  projectId: string | undefined
  projectdata: Types.Project
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

function* getProjectDetails({ projectId }: GetParams) {
  try {
    const account = yield select((state) => state.auth.account)
    const response = yield call(getProjectDetailsRequest, account, projectId)

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
function* watchGetRequest() {
  yield takeLatest(ActionTypes.NEW_PROJECT_REQUEST, createNewProject)
  yield takeLatest(ActionTypes.GET_ALL_PROJECT_REQUEST, getAllProjects)
  yield takeLatest(ActionTypes.GET_PROJECT_DETAILS_REQUEST, getProjectDetails)
  yield takeLatest(
    ActionTypes.UPDATE_PROJECT_DETAILS_REQUEST,
    updateProjectDetails
  )
}

export default function* sagas() {
  yield all([watchGetRequest()])
}
