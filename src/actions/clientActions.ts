import * as ActionTypes from './actionTypes'
import * as Types from '../utils/Interface'

export function getAllClientsRequest(account: Types.Account) {
    return {
      type: ActionTypes.GET_ALL_CLIENTS_REQUEST,
      account
    }
  }

  export function getAllClientsSuccess(clientsData:Array<Types.Client>) {
    return {
        type: ActionTypes.GET_ALL_CLIENTS_SUCCESS,
        payload:clientsData
      }
  }

  export function getAllClientsError(error: string) {
    return {
      type: ActionTypes.GET_ALL_CLIENTS_ERROR,
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
export function addClientSuccess(client:Types.Client){
  return {
    type: ActionTypes.ADD_CLIENT_SUCCESS,
    payload:client
  }
}
export function addClientError(error:string){
  return {
    type: ActionTypes.ADD_CLIENT_ERROR,
    error
  }
}

export function getClientRequest(accountId:string,clientId:string){
  return {
    type: ActionTypes.GET_CLIENT_REQUEST,
    accountId,
    clientId
  }
}
export function getClientSuccess(client:Types.Client){
  return {
    type: ActionTypes.GET_CLIENT_SUCCESS,
    payload:client
  }
}
export function getClientError(error:string){
  return {
    type: ActionTypes.GET_CLIENT_ERROR,
    error
  }
}
  
  
  