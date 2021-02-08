import {
    GET_CLIENTS_REQUEST,
    GET_CLIENTS_SUCCESS,
    GET_CLIENTS_ERROR,
    ADD_CLIENT_REQUEST,
    ADD_CLIENT_SUCCESS,
    ADD_CLIENT_ERROR
  } from 'actions/actionTypes'
  import { createTransform } from 'redux-persist'
  import * as Types from '../utils/Interface'
  
  export type State = {
   clientsData:Array<Types.Client>
  }
  
  export type Action = {
    type: string
    payload: {}
    error: string
    clientsData:[]
  }
  
  const initialState = {
    loading:false,
    success:false,
    error:false,
    clientsData:[],
    newClientSuccess:false,
    newClientError:false,
    newClientLoading:false,
    newClientErrorMsg:null
  }
  
  
  const getClientsRequest = (state: State, action: Action) => ({
    ...state,
    loading:true,
    success:false,
    error:false
  })
  
  const getClientsSuccess = (state: State, action: Action) => {
    return {
      ...state,
      clientsData:action.payload,
      loading:false,
      success:true,
      error:false
    }
  }
  
  const getClientsError = (state: State, action: Action) => ({
    ...state,
    error:true,
    loading:false,
    success:false
  })
  const newClientRequest = (state: State, action: Action) => ({
    ...state,
    newClientSuccess:false,
    newClientError:false,
    newClientLoading:true,
    newClientErrorMsg:null
    
  })
  
  const newClientSuccess = (state: State, action: Action) => {
    return {
      ...state,
      newClientSuccess:true,
      newClientError:false,
      newClientLoading:false,
      newClientData:action.payload
    }
  }

  const newClientError = (state: State, action: Action) => ({
    ...state,
    newClientSuccess:false,
    newClientError:true,
    newClientLoading:false,
    newClientErrorMsg:action.error

  })


  const clientReducer = (state = initialState, action: Action) => {
    switch (action.type) {
      case GET_CLIENTS_REQUEST:
        return getClientsRequest(state, action)
      case GET_CLIENTS_SUCCESS:
        return getClientsSuccess(state, action)
      case GET_CLIENTS_ERROR:
        return getClientsError(state, action)
      case ADD_CLIENT_REQUEST:
          return newClientRequest(state, action)
      case ADD_CLIENT_ERROR:
            return newClientError(state, action)
      case ADD_CLIENT_SUCCESS:
          return newClientSuccess(state, action)
      
      default:
        return state
    }
  }
  
  export const projectClient = createTransform(
    (inboundState: State) => {
      return {
        ...inboundState,
        loading:false,
        success:false,
        error:false,
        clientsData:[],
        newClientSuccess:false,
        newClientError:false,
        newClientLoading:false,
        newClientErrorMsg:null
      }
    },
    (outboundState: State) => outboundState,
    { whitelist: ['client'] }
  )
  
  export default clientReducer
  