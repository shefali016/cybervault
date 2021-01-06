import * as ActionTypes from './actionTypes';
import * as Types from '../utils/types';

export function createNewProjectRequest(newProjectData: Types.Project) {
  return {
    type: ActionTypes.NEW_PROJECT_REQUEST,
    newProjectData,
  };
}

export function createNewProjectSuccess (newProjectData: Types.Project) {
  return {
    type: ActionTypes.NEW_PROJECT_SUCCESS,
    payload: newProjectData,
    };
  };

export function createNewProjectFailure (error: any) {
  return {
    type: ActionTypes.NEW_PROJECT_FAILURE,
    error
    };
  }

  export function clearNewProjectData () {
    return {
      type: ActionTypes.CLEAR_NEW_PROJECT_SUCCESS,
      };
    };