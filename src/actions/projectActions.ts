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


  export function getAllProjectsRequest() {
    return {
      type: ActionTypes.GET_ALL_PROJECT_REQUEST
    };
  }
  
  export function getAllProjectsRequestSuccess (allProjectsData: Types.AllProjects) {
    return {
      type: ActionTypes.GET_ALL_PROJECT_SUCCESS,
      allProjectsData,
      };
    };
  
  export function getAllProjectsRequestFailure (error: any) {
    return {
      type: ActionTypes.GET_ALL_PROJECT_FAILURE,
      error
      };
    }