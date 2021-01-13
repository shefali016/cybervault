import * as ActionTypes from './actionTypes'
import * as Types from '../utils/types'

export const updateUser = (update: {}) => ({
  type: ActionTypes.UPDATE_USER,
  update
})
export const updateUserSuccess = (user: Types.User) => ({
  type: ActionTypes.UPDATE_USER,
  user
})
export const updateUserFailure = (error: string) => ({
  type: ActionTypes.UPDATE_USER_FAILURE,
  error
})
