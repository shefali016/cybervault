import { all, call, put, takeLatest } from 'redux-saga/effects'
import { createNewProjectSuccess, createNewProjectFailure, getAllProjectsRequestSuccess, getAllProjectsRequestFailure } from "../actions/projectActions";
import * as Types from '../utils/types';
import * as ActionTypes from '../actions/actionTypes';
import { createNewProjectRequest, getAllProjectsRequest } from '../apis/projectRequest';

type Params = { newProjectData: Types.Project, type: string, account: Account }
type GetParams = {type: string, account: Account}

function* createNewProject( { newProjectData, account }: Params) {
  try {
    console.log('createNewProject ===', newProjectData, account)
    const response = yield call(createNewProjectRequest, newProjectData, account);
    yield put(createNewProjectSuccess(response))
  } catch (error: any) {
    yield put(createNewProjectFailure(error))
  }
}

function* getAllProjects({ account }: GetParams) {
  try {
    const response = yield call(getAllProjectsRequest, account);
    yield put(getAllProjectsRequestSuccess(response))
  } catch (error: any) {
    yield put(getAllProjectsRequestFailure(error))
  }
}

function* watchGetRequest() {
 yield takeLatest(ActionTypes.NEW_PROJECT_REQUEST, createNewProject)
 yield takeLatest(ActionTypes.GET_ALL_PROJECT_REQUEST, getAllProjects)
}

export default function* sagas() {
  yield all([
    watchGetRequest()
  ])
}

