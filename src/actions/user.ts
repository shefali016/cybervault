import * as ActionTypes from './actionTypes'
import * as Types from '../utils/Interface'

export const updateUser = (update: {}) => ({
  type: ActionTypes.UPDATE_USER,
  update
})
export const updateUserSuccess = (user: Types.User) => ({
  type: ActionTypes.UPDATE_USER_SUCCESS,
  user
})
export const updateUserFailure = (error: string) => ({
  type: ActionTypes.UPDATE_USER_FAILURE,
  error
})

export const getUser = (id: string) => ({
  type: ActionTypes.GET_USER,
  id
})
export const getUserSuccess = (user: Types.User) => ({
  type: ActionTypes.GET_USER_SUCCESS,
  user
})
export const getUserFailure = (error: string) => ({
  type: ActionTypes.GET_USER_FAILURE,
  error
})
