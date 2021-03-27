import * as ActionTypes from './actionTypes'
import { Account, Storage } from '../utils/Interface'

export const getAccount = (id: string) => ({
  type: ActionTypes.GET_ACCOUNT,
  id
})
export const getAccountSuccess = (account: Account) => ({
  type: ActionTypes.GET_ACCOUNT_SUCCESS,
  account
})
export const getAccountFailure = (error: string) => ({
  type: ActionTypes.GET_ACCOUNT_FAILURE,
  error
})

export const updateAccount = (account: Account) => ({
  type: ActionTypes.UPDATE_ACCOUNT,
  account
})

export const updateAccountSuccess = (account: Account) => ({
  type: ActionTypes.UPDATE_ACCOUNT_SUCCESS,
  account
})

export const updateAccountFailure = (error: string) => ({
  type: ActionTypes.UPDATE_ACCOUNT_FAILURE,
  error
})

export const getUsedStorage = () => ({
  type: ActionTypes.GET_STORAGE_USED
})

export const getUsedStorageSuccess = (storage: Storage) => ({
  type: ActionTypes.GET_STORAGE_USED_SUCCESS,
  storage
})

export const getUsedStorageFailure = (error: string) => ({
  type: ActionTypes.GET_STORAGE_USED_FAILURE,
  error
})
