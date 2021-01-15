import * as ActionTypes from './actionTypes'
import { Account } from '../utils/types'

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
