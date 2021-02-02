import * as ActionTypes from './actionTypes'
import * as Types from '../utils/Interface'

export function getClientsRequest(account: Types.Account) {
    return {
      type: ActionTypes.GET_CLIENTS_REQUEST,
      account
    }
  }

  export function getClientsSuccess(clientsData:Array<Types.Client>) {
    return {
        type: ActionTypes.GET_CLIENTS_SUCCESS,
        payload:clientsData
      }
  }

  export function getClientsError(error: string) {
    return {
      type: ActionTypes.GET_CLIENTS_ERROR,
      error
    }
  }

export function addClientRequest(account: Types.Account,client:Types.Client){
  return {
    type: ActionTypes.ADD_CLIENT_REQUEST,
    account,
    client
  }
}
export function addClientSuccess(clientData:Types.Client){
  return {
    type: ActionTypes.ADD_CLIENT_SUCCESS,
    payload:clientData
  }
}
export function addClientError(error:string){
  return {
    type: ActionTypes.ADD_CLIENT_ERROR,
    error
  }
}
  
  