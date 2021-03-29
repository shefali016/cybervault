import * as ActionTypes from 'actions/actionTypes'
import { CloudNotification } from 'utils/Interface'
import { Action } from 'actions/notification'

export type State = {
  notifications: CloudNotification[]

  readLoading: boolean
  readError: null | string
}

const initialState: State = {
  notifications: [],

  readLoading: false,
  readError: null
}

const notifications = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.notifications
      }
    default:
      return initialState
  }
}

export default notifications
