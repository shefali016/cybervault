import * as ActionTypes from './actionTypes';
import * as Types from '../utils/types';

export function createNewProjectRequest(newProjectData: Types.Project) {
  return {
    type: ActionTypes.NEW_PROJECT_REQUEST,
    newProjectData,
  };
}

export function createNewProjectSuccess (activeUser: any) {
  return {
    type: ActionTypes.NEW_PROJECT_SUCCESS
    };
  };

export function createNewProjectFailure (error: any) {
  return {
    type: ActionTypes.NEW_PROJECT_FAILURE,
    error
    };
  }