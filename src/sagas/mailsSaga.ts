import { all, call, put, takeLatest, select } from 'redux-saga/effects'
import * as ActionTypes from '../actions/actionTypes'
import * as MailApi from '../apis/mails';
import * as Actions from '../actions/mails'
import {Mail} from '../utils/Interface';


function* sendEmailRequest({mail}:any) {
  try {
    yield call(MailApi.sendMail, mail)
    yield put(Actions.sendEmailSuccess())
  } catch (error: any) {
    yield put(Actions.sendEmailError(error?.message || 'default'))
  }
}
function* getAllMailTemplatesRequest() {
try {
  let response=yield call(MailApi.allMailTemplates)
  yield put(Actions.getAllMailTemplatesSuccess(response))
} catch (error: any) {
  yield put(Actions.getAllMailTemplatesError(error?.message || 'default'))
}
}


function* watchRequests() {
  yield takeLatest(ActionTypes.SEND_EMAIL_REQUEST, sendEmailRequest)
  yield takeLatest(ActionTypes.GET_ALL_MAIL_TEMPLATES_REQUEST,getAllMailTemplatesRequest )


}

export default function* sagas() {
  yield all([watchRequests()])
}
