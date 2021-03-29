import { all, put, call, select, takeLatest, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import * as ActionTypes from '../actions/actionTypes'
import * as NotificationActions from 'actions/notification'
import * as NotificationApis from 'apis/notifications'
import { Account, CloudNotification } from '../utils/Interface'
import { Action } from 'actions/notification'

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

function* markNotificationRead({ notification }: Action) {
  try {
    const account: Account = yield select((state) => state.auth.account)
    yield call(NotificationApis.markRead, account, notification)
    yield put(NotificationActions.markNotificationReadSuccess(notification))
  } catch (error: any) {
    yield put(
      NotificationActions.markNotificationReadFailure(
        error?.message || 'default'
      )
    )
  }
}

function* watchRequests() {
  yield takeLatest(ActionTypes.GET_NOTIFICATIONS, listenToNotificationsSaga)
  yield takeLatest(ActionTypes.MARK_NOTIFICATION_READ, markNotificationRead)
}

export default function* sagas() {
  yield all([watchRequests()])
}
