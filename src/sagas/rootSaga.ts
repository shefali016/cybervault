import { all } from 'redux-saga/effects'
import authSagas from './authSagas'
import projectSagas from './projectSagas'
import userSagas from './user'
import accountSagas from './account'
import invoiceSagas from './invoice'
import clientSaga from './clientSaga'
import portfolioSagas from './portfolioSagas'
import stripeSaga from './stripeSagas'

export default function* rootSaga() {
  yield all([
    authSagas(),
    projectSagas(),
    userSagas(),
    accountSagas(),
    invoiceSagas(),
    portfolioSagas(),
    clientSaga(),
    stripeSaga()
  ])
}
