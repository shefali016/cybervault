import * as ActionTypes from 'actions/actionTypes'
import { CloudNotification } from 'utils/Interface'
import { Action } from 'actions/notification'

export type State = {
  data: CloudNotification[]

  readLoading: null | string
  readError: null | string
}

const initialState: State = {
  data: [],

  readLoading: null,
  readError: null
}

const notifications = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        data: action.notifications
      }
    case ActionTypes.MARK_NOTIFICATION_READ:
      return { ...state, readLoading: action.notification.id, readError: null }
    case ActionTypes.MARK_NOTIFICATION_READ_SUCCESS:
      return {
        ...state,
        readLoading: null,
        data: state.data.filter(
          (notification: CloudNotification) =>
            notification.id !== action.notification.id
        )
      }
    case ActionTypes.MARK_NOTIFICATION_READ_FAILURE:
      return { ...state, readLoading: null, readError: action.error }
    default:
      return state
  }
}

export default notifications
