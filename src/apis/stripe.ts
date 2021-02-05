import axios from 'axios'
import {
  Account,
  StripeAccount,
  StripeAccountLink,
  StripeLoginLink
} from '../utils/Interface'
import { updateAccount } from './account'

const { server_url, domain } = require('../config.json')

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
export const sendMsg = async (
  email:string,message:string
): Promise<any> => {
  
  const res = await axios.post<any>(
    `${server_url}/api/v1/sendEmail`,
    { email, message }
  )
  console.log(res,"responseeeeeeee")

  if (res.status === 200) {
    // const stripeAccount = res.data
    // await updateAccount({
    //   ...account,
    //   stripe: { ...account.stripe, accountId: stripeAccount.id }
    // })
    // return stripeAccount
  } else {
    throw Error('Failed to send Message')
  }
}
