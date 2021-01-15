import { all, call, put, takeLatest } from 'redux-saga/effects'
import { createNewProjectSuccess, createNewProjectFailure, getAllProjectsRequestSuccess, getAllProjectsRequestFailure } from "../actions/projectActions";
import * as Types from '../utils/types';
import * as ActionTypes from '../actions/actionTypes';
import { createNewProjectRequest, getAllProjectsRequest } from '../apis/projectRequest';

type Params = { newProjectData: Types.Project, type: string }
type GetParams = {type: string}

function* createNewProject( { newProjectData }: Params) {
  try {
    const response = yield call(createNewProjectRequest, newProjectData);
    yield put(createNewProjectSuccess(response))
  } catch (error: any) {
    yield put(createNewProjectFailure(error))
  }
}

function* getAllProjects() {
  try {
    const response = yield call(getAllProjectsRequest);
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

