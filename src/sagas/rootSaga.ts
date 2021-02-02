import { all } from 'redux-saga/effects'
import authSagas from './authSagas'
import projectSagas from './projectSagas'
import userSagas from './user'
import accountSagas from './account'
import clientSaga from './clientSaga'

export default function* rootSaga() {
  yield all([authSagas(), projectSagas(), userSagas(), accountSagas(),clientSaga()])
}
