import {
  GET_ALL_CLIENTS_REQUEST,
  GET_ALL_CLIENTS_SUCCESS,
  GET_ALL_CLIENTS_ERROR,
  GET_CLIENT_REQUEST,
  GET_CLIENT_ERROR,
  GET_CLIENT_SUCCESS,
  ADD_CLIENT_REQUEST,
  ADD_CLIENT_SUCCESS,
  ADD_CLIENT_ERROR
} from 'actions/actionTypes'
import { createTransform } from 'redux-persist'
import { replaceOrAdd } from 'utils'
import * as Types from '../utils/Interface'
import { Client } from '../utils/Interface'

export type State = {
  clientsData: Array<Types.Client>
  loading: false
  success: false
  error: false
  newClientSuccess: null | Types.Client
  newClientError: boolean
  newClientLoading: boolean
  clientDetailLoading: boolean
  clientDetailSuccess: boolean
  clientDetailError: boolean
  clientDetailData: Types.Client | {}
}

export type Action = {
  type: string
  payload: {}
  client: Client
  error: string
}

const initialState: State = {
  loading: false,
  success: false,
  error: false,
  clientsData: [],
  newClientSuccess: null,
  newClientError: false,
  newClientLoading: false,
  clientDetailLoading: false,
  clientDetailSuccess: false,
  clientDetailError: false,
  clientDetailData: {}
}

const getAllClientsRequest = (state: State, action: Action) => ({
  ...state,
  loading: true,
  success: false,
  error: false
})

const getAllClientsSuccess = (state: State, action: Action) => {
  return {
    ...state,
    clientsData: action.payload,
    loading: false,
    success: true,
    error: false
  }
}

const getAllClientsError = (state: State, action: Action) => ({
  ...state,
  error: true,
  loading: false,
  success: false
})
const newClientRequest = (state: State, action: Action) => ({
  ...state,
  newClientSuccess: false,
  newClientError: false,
  newClientLoading: true
})

const newClientSuccess = (state: State, action: Action) => {
  return {
    ...state,
    newClientSuccess: action.client,
    newClientError: false,
    newClientLoading: false,
    newClientData: action.client,
    clientsData: replaceOrAdd(
      state.clientsData,
      action.client,
      (client: Client) => client.id === action.client.id
    )
  }
}

const newClientError = (state: State, action: Action) => ({
  ...state,
  newClientSuccess: false,
  newClientError: action.error,
  newClientLoading: false
})

const getClientRequest = (state: State, action: Action) => ({
  ...state,
  clientDetailLoading: true,
  clientDetailSuccess: false,
  clientDetailError: false
})

const getClientSuccess = (state: State, action: Action) => {
  return {
    ...state,
    clientDetailData: action.payload,
    clientDetailLoading: false,
    clientDetailSuccess: true,
    clientDetailError: false
  }
}

const getClientError = (state: State, action: Action) => ({
  ...state,
  clientDetailError: true,
  clientDetailLoading: false,
  success: false
})

const clientReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS_REQUEST:
      return getAllClientsRequest(state, action)
    case GET_ALL_CLIENTS_SUCCESS:
      return getAllClientsSuccess(state, action)
    case GET_ALL_CLIENTS_ERROR:
      return getAllClientsError(state, action)
    case GET_CLIENT_REQUEST:
      return getClientRequest(state, action)
    case GET_CLIENT_SUCCESS:
      return getClientSuccess(state, action)
    case GET_CLIENT_ERROR:
      return getClientError(state, action)
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

export const clientTransform = createTransform(
  (inboundState: State) => {
    return inboundState
  },
  (outboundState: State) => ({
    ...initialState,
    clientsData: outboundState.clientsData
  }),
  { whitelist: ['clients'] }
)

export default clientReducer
