import * as ActionTypes from './actionTypes'
import { CloudNotification } from 'utils/Interface'

export const requestGetNotifications = () => ({
  type: ActionTypes.GET_NOTIFICATIONS
})
export const getNotificationsSuccess = (
  notifications: CloudNotification[]
) => ({
  type: ActionTypes.GET_NOTIFICATIONS_SUCCESS,
  notifications
})
export const getNotificationsFailure = (error: string) => ({
  type: ActionTypes.GET_NOTIFICATIONS_FAILURE,
  error
})

export const markNotificationRead = (notification: CloudNotification) => ({
  type: ActionTypes.MARK_NOTIFICATION_READ,
  notification
})
export const markNotificationReadSuccess = (
  notification: CloudNotification
) => ({ type: ActionTypes.MARK_NOTIFICATION_READ_SUCCESS, notification })
export const markNotificationReadFailure = (error: string) => ({
  type: ActionTypes.MARK_NOTIFICATION_READ_FAILURE,
  error
})

export type Action = {
  type: string
  notifications: CloudNotification[]
  notification: CloudNotification
  error: string
}
