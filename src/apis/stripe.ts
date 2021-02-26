import axios from 'axios'
import {
  Account,
  StripeAccount,
  StripeAccountLink,
  StripeCustomer,
  StripeLoginLink,
  StripePlans,
  User
} from '../utils/Interface'
import { updateAccount } from './account'
import { PaymentMethod } from '@stripe/stripe-js'

const { server_url, domain } = require('../config.json')

export const detachPaymentMethod = async (paymentMethodId: string) => {
  const res = await axios.post<PaymentMethod>(
    `${server_url}/api/v1/stripe/detach_payment_method`,
    { paymentMethodId }
  )

  if (res.status === 200) {
    return res.data
  } else {
    throw Error('Failed to detach payment method')
  }
}

export const getPaymentMethods = async (
  customerId: string
): Promise<Array<PaymentMethod>> => {
  const res = await axios.get<Array<PaymentMethod>>(
    `${server_url}/api/v1/stripe/payment_methods`,
    { params: { customerId } }
  )

  if (res.status === 200) {
    return res.data
  } else {
    throw Error('Failed to create stripe customer')
  }
}

export const attachPaymentMethod = async (
  paymentMethodId: string,
  customerId: string
) => {
  const res = await axios.post<PaymentMethod>(
    `${server_url}/api/v1/stripe/attach_payment_method`,
    { customerId, paymentMethodId }
  )

  if (res.status === 200) {
    return res.data
  } else {
    throw Error('Failed to attach payment method')
  }
}

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

export const getStripeCustomer = async (
  customerId: string
): Promise<StripeCustomer> => {
  const res = await axios.get<StripeCustomer>(
    `${server_url}/api/v1/stripe/customer`,
    { params: { customerId } }
  )

  if (res.status === 200) {
    const stripeCustomer = res.data
    return stripeCustomer
  } else {
    throw Error('Failed to get stripe customer')
  }
}

export const createStripeCustomer = async (
  user: User
): Promise<StripeCustomer> => {
  const { email, name } = user

  const res = await axios.post<StripeCustomer>(
    `${server_url}/api/v1/stripe/customer`,
    { email, name }
  )

  if (res.status === 200) {
    const stripeCustomer = res.data
    return stripeCustomer
  } else {
    throw Error('Failed to create stripe customer')
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

export const getStripePlansList = async () => {
  const res = await axios.post<Array<StripePlans>>(
    `${server_url}/api/v1/stripe/get_plans_list`
  )

  if (res.status === 200) {
    return res.data
  } else {
    throw Error('Stripe Plans Not Found')
  }
}

export const createStripePlanSubcription = async (
  customerId: string,
  planId: string
) => {
  const res = await axios.post<Array<StripePlans>>(
    `${server_url}/api/v1/stripe/plan_subscription`,
    {
      customerId,
      planId
    }
  )

  if (res.status === 200) {
    return res.data
  } else {
    throw Error('Stripe Plans Not Found')
  }
}
