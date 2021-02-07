import { all } from 'redux-saga/effects'
import authSagas from './authSagas'
import projectSagas from './projectSagas'
import userSagas from './user'
import accountSagas from './account'
import clientSaga from './clientSaga'
import portfolioSagas from './portfolioSagas'
export default function* rootSaga() {
  yield all([
    authSagas(),
    projectSagas(),
    userSagas(),
    accountSagas(),
    portfolioSagas(),
    clientSaga()
  ])
}
