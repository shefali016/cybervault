import { all, put, select, takeLatest, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as ActionTypes from '../actions/actionTypes'
import * as NotificationActions from 'actions/notification'
import * as NotificationApis from 'apis/notifications'
import { Account, CloudNotification } from '../utils/Interface'

function* listenToNotificationsSaga() {
  try {
    const account: Account = yield select((state) => state.auth.account)

    const listener = eventChannel((emit) => {
      return NotificationApis.listenToNotifications(account, emit)
    })

    while (true) {
      const notifications: CloudNotification[] = yield take(listener)
      yield put(NotificationActions.getNotificationsSuccess(notifications))
    }
  } catch (error: any) {
    yield put(
      NotificationActions.getNotificationsFailure(error?.message || 'default')
    )
  }
}

function* watchRequests() {
  yield takeLatest(ActionTypes.GET_NOTIFICATIONS, listenToNotificationsSaga)
}

export default function* sagas() {
  yield all([watchRequests()])
}
