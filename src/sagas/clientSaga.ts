import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import {
  getClientsSuccess,
  getClientsError,
  addClientError,
  addClientSuccess
} from '../actions/clientActions'
import * as Types from '../utils/Interface'
import * as ActionTypes from '../actions/actionTypes'
import { ReduxState } from 'reducers/rootReducer'
import {addClient, getClients} from '../apis/clients'

type GetParams = {
  type: string
  account: Account,
  client:Types.Client
}

function* getClientRequest({ account }: GetParams) {
  try {
    const response = yield call(getClients, account)
    yield put(getClientsSuccess(response))
  } catch (error: any) {
    yield put(getClientsError(error?.message || 'default'))
  }
}
function* addClientRequest({ account,client }: GetParams) {
    try {
      const response = yield call(addClient, account,client)
      yield put(addClientSuccess(response))
    } catch (error: any) {
      yield put(addClientError(error?.message || 'default'))
    }
  }

function* watchGetRequest() {
  yield takeLatest(ActionTypes.GET_CLIENTS_REQUEST, getClientRequest)
  yield takeLatest(ActionTypes.ADD_CLIENT_REQUEST, addClientRequest)
  
}

export default function* sagas() {
  yield all([watchGetRequest()])
}
