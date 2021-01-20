import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  createNewProjectSuccess,
  createNewProjectFailure,
  getAllProjectsRequestSuccess,
  getAllProjectsRequestFailure,
  getProjectDetailsSuccess,
  getProjectDetailsFailure,
  updateProjectDetailsSuccess,
  updateProjectDetailsFailure
} from '../actions/projectActions'
import * as Types from '../utils/types'
import * as ActionTypes from '../actions/actionTypes'
import {
  createNewProjectRequest,
  getAllProjectsRequest,
  getProjectDetailsRequest,
  updateProjectDetailsRequest
} from '../apis/projectRequest'

type Params = { newProjectData: Types.Project; type: string; account: Account }
type GetParams = {
  type: string
  account: Account
  projectId: string | undefined
  projectdata: string | undefined
}

function* createNewProject({ newProjectData, account }: Params) {
  try {
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

function* getAllProjects({ account }: GetParams) {
  try {
    const response = yield call(getAllProjectsRequest, account)
    yield put(getAllProjectsRequestSuccess(response))
  } catch (error: any) {
    yield put(getAllProjectsRequestFailure(error?.message || 'default'))
  }
}

function* getProjectDetails({ account, projectId }: GetParams) {
  try {
    const response = yield call(getProjectDetailsRequest, account, projectId)

    yield put(
      getProjectDetailsSuccess(response && response.length ? response[0] : {})
    )
  } catch (error: any) {
    yield put(getProjectDetailsFailure(error?.message || 'default'))
  }
}

function* updateProjectDetails({ account, projectdata }: GetParams) {
  try {
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
