import axios from 'axios'
import {
  Account,
  StripeAccount,
  StripeAccountLink,
  StripeLoginLink
} from '../utils/Interface'
import { updateAccount } from './account'

const { server_url, domain } = require('../config.json')

export const verifyStripeAccount = async (
  account: Account
): Promise<{
  account: Account
  stripeAccount: StripeAccount | undefined
  isUpdated: boolean
}> => {
  if (typeof account.stripe.accountId !== 'string') {
    return { account, stripeAccount: undefined, isUpdated: false }
  }

  const stripeAccount = await getStripeAccount(account.stripe.accountId)
  const { details_submitted, payouts_enabled } = stripeAccount
  const { detailsSubmitted, payoutsEnabled } = account.stripe

  if (
    details_submitted !== detailsSubmitted ||
    payouts_enabled !== payoutsEnabled
  ) {
    const updatedAccount = {
      ...account,
      stripe: {
        ...account.stripe,
        detailsSubmitted: details_submitted,
        payoutsEnabled: payouts_enabled
      }
    }
    return { account: updatedAccount, stripeAccount, isUpdated: true }
  } else {
    return { account, stripeAccount, isUpdated: false }
  }
}

export const createStripeAccount = async (
  account: Account
): Promise<StripeAccount> => {
  const { email, region } = account
  const res = await axios.post<StripeAccount>(
    `${server_url}/api/v1/stripe/create_account`,
    { email, country: region?.code }
  )

  if (res.status === 200) {
    const stripeAccount = res.data
    await updateAccount({
      ...account,
      stripe: { ...account.stripe, accountId: stripeAccount.id }
    })
    return stripeAccount
  } else {
    throw Error('Failed to create stripe account')
  }
}

export const getStripeAccount = async (id: string): Promise<StripeAccount> => {
  const res = await axios.get<StripeAccount>(
    `${server_url}/api/v1/stripe/get_account?id=${id}`
  )

  if (res.status === 200) {
    return res.data
  } else {
    throw Error('Failed to create stripe account')
  }
}

export const createStripeAccountLink = async (
  stripeAccountId: string
): Promise<StripeAccountLink> => {
  const res = await axios.post<StripeAccountLink>(
    `${server_url}/api/v1/stripe/create_account_link`,
    {
      id: stripeAccountId,
      refresh_url: `${domain}/refresh_account_link/${stripeAccountId}`,
      return_url: `${domain}/invoices`
    }
  )

  if (res.status === 200) {
    return res.data
  } else {
    throw Error('Failed to create stripe account')
  }
}

export const createStripeLogin = async (stripeAccountId: string) => {
  const res = await axios.post<StripeLoginLink>(
    `${server_url}/api/v1/stripe/create_login_link`,
    {
      id: stripeAccountId,
      redirect_url: `${domain}/invoices`
    }
  )

  if (res.status === 200) {
    return res.data
  } else {
    throw Error('Failed to create stripe account')
  }
}

