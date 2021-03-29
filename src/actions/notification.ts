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

export type Action =
  | { type: typeof ActionTypes.GET_NOTIFICATIONS }
  | {
      type: typeof ActionTypes.GET_NOTIFICATIONS_SUCCESS
      notifications: CloudNotification[]
    }
  | {
      type: typeof ActionTypes.GET_NOTIFICATIONS_FAILURE
      error: string
    }
