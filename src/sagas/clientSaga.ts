import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import * as Actions from '../actions/clientActions'
import * as Types from '../utils/Interface'
import * as ActionTypes from '../actions/actionTypes'
import { ReduxState } from 'reducers/rootReducer'
import {addClient, getClients} from '../apis/clients'

type GetParams = {
  type: string
  account: Types.Account,
  client:Types.Client
}

function* getClientRequest({ account }: GetParams) {
  try {
    const response = yield call(getClients, account)
    yield put(Actions.getClientsSuccess(response))
  } catch (error: any) {
    yield put(Actions.getClientsError(error?.message || 'default'))
  }
}
function* addClientRequest({ account,client }: GetParams) {
    try {
      const response = yield call(addClient, account,client)
      yield put(Actions.addClientSuccess(response))
      yield put(Actions.getClientsRequest(account))
    } catch (error: any) {
      yield put(Actions.addClientError(error?.message || 'default'))
    }
  }

function* watchGetRequest() {
  yield takeLatest(ActionTypes.GET_CLIENTS_REQUEST, getClientRequest)
  yield takeLatest(ActionTypes.ADD_CLIENT_REQUEST, addClientRequest)
  
}

export default function* sagas() {
  yield all([watchGetRequest()])
}
