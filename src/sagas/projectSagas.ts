import { all, call, put, takeLatest } from 'redux-saga/effects'
import { createNewProjectSuccess, createNewProjectFailure } from "../actions/projectActions";
import * as Types from '../utils/types';
import * as ActionTypes from '../actions/actionTypes';
import { createNewProjectRequest } from './projectRequest';

type Params = { newProjectData: Types.Project, type: string }

function* createNewProject( { newProjectData }: Params) {
  try {
    const response = yield call(createNewProjectRequest, newProjectData);
    if (response) {
      yield put(createNewProjectSuccess(response))
    } else {
      yield put(createNewProjectFailure(response))
    }
  } catch (error: any) {
    yield put(createNewProjectFailure(error))
  }
}

function* watchGetRequest() {
 yield takeLatest(ActionTypes.NEW_PROJECT_REQUEST, createNewProject)
}

export default function* sagas() {
  yield all([
    watchGetRequest()
  ])
}

