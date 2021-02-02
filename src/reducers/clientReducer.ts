import {
    GET_CLIENTS_REQUEST,
    GET_CLIENTS_SUCCESS,
    GET_CLIENTS_ERROR,
    ADD_CLIENT_REQUEST,
    ADD_CLIENT_SUCCESS,
    ADD_CLIENT_ERROR
  } from 'actions/actionTypes'
  import { createTransform } from 'redux-persist'
  import * as Types from '../utils/types'
  
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
    addClientSuccess:false,
    addClientError:false,
    addClientLoading:false
  }
  
  
  const getClientsRequest = (state: State, action: Action) => ({
    ...state,
    loading:true
  })
  
  const getClientsSuccess = (state: State, action: Action) => {
    return {
      ...state,
      clientsData:action.payload,
      loading:false,
      success:true
    }
  }
  
  const getClientsError = (state: State, action: Action) => ({
    ...state,
    error:true
  })
  const addClientRequest = (state: State, action: Action) => ({
    ...state,
    addClientSuccess:false,
    addClientError:false,
    addClientLoading:true
    
  })
  
  const addClientSuccess = (state: State, action: Action) => {
    return {
      ...state,
      addClientSuccess:true,
      addClientError:false,
      addClientLoading:false
    }
  }

  const addClientError = (state: State, action: Action) => ({
    ...state,
    addClientSuccess:false,
    addClientError:true,
    addClientLoading:false

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
          return addClientRequest(state, action)
      case ADD_CLIENT_ERROR:
            return addClientError(state, action)
      case ADD_CLIENT_SUCCESS:
          return addClientSuccess(state, action)
      
      default:
        return state
    }
  }
  
  export const projectClient = createTransform(
    (inboundState: State) => {
      return {
        ...inboundState,
      }
    },
    (outboundState: State) => outboundState,
    { whitelist: ['client'] }
  )
  
  export default clientReducer
  