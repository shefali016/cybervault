import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import * as Actions from '../actions/clientActions'
import * as Types from '../utils/Interface'
import * as ActionTypes from '../actions/actionTypes'
import { ReduxState } from 'reducers/rootReducer'
import {addClient, getClients,getClient} from '../apis/clients'

type GetParams = {
  type: string
  account: Types.Account,
  client:Types.Client,
  clientId:string
}

function* getAllClientRequest({ account }: GetParams) {
  try {
    const response = yield call(getClients, account)
    yield put(Actions.getAllClientsSuccess(response))
  } catch (error: any) {
    yield put(Actions.getAllClientsError(error?.message || 'default'))
  }
}
function* addClientRequest({ account,client }: GetParams) {
    try {
      const response = yield call(addClient, account,client)
     if(Object.keys(response).includes('id')){
      yield put(Actions.addClientSuccess(response))
      yield put(Actions.getAllClientsRequest(account))
     }
     else{
      yield put(Actions.addClientError(response.message || 'default'))
     }
    } catch (error: any) {
      yield put(Actions.addClientError(error?.message || 'default'))
    }
}
function* getClientRequest({ account,clientId }: GetParams) {
  try {
    const response = yield call(getClient, account,clientId)
    yield put(Actions.getClientSuccess(response))
  } catch (error: any) {
    yield put(Actions.getClientError(error?.message || 'default'))
  }
}

function* watchGetRequest() {
  yield takeLatest(ActionTypes.GET_ALL_CLIENTS_REQUEST, getAllClientRequest)
  yield takeLatest(ActionTypes.GET_CLIENT_REQUEST, getClientRequest)
  yield takeLatest(ActionTypes.ADD_CLIENT_REQUEST, addClientRequest)
  
}

export default function* sagas() {
  yield all([watchGetRequest()])
}
