import axios from 'axios'
import {
  Account,
  Product,
  StripeAccount,
  StripeAccountLink,
  StripeCustomer,
  StripeLoginLink,
  StripePlans,
  Subscription,
  SubscriptionType,
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

export const getProducts = async () => {
  const res = await axios.get<{ data: Array<StripePlans> }>(
    `${server_url}/api/v1/stripe/get_products`
  )

  if (res.status === 200) {
    return res.data.data
  } else {
    throw Error('Stripe products not found')
  }
}

export const getPlans = async (productId: string) => {
  const res = await axios.get<{ data: Array<StripePlans> }>(
    `${server_url}/api/v1/stripe/get_plans`,
    { params: { productId } }
  )

  if (res.status === 200) {
    return res.data.data
  } else {
    throw Error('Stripe plans not found')
  }
}

export const createStripePlanSubcription = async (
  customerId: string,
  planId: string,
  paymentMethodId: string,
  type: SubscriptionType
) => {
  const res = await axios.post<Array<StripePlans>>(
    `${server_url}/api/v1/stripe/plan_subscription`,
    {
      customerId,
      planId,
      paymentMethodId,
      type
    }
  )

  if (res.status === 200) {
    return res.data
  } else {
    throw Error('Stripe Plans Not Found')
  }
}

export const cancelStripePlanSubcription = async (subscriptionId: string) => {
  const res = await axios.post<StripePlans>(
    `${server_url}/api/v1/stripe/cancel_plan_subscription`,
    {
      subscriptionId
    }
  )
  if (res.status === 200) {
    return res.data
  } else {
    throw Error('Stripe Subscription cancel error')
  }
}

export const updateStripePlanSubcription = async (
  subscriptionId: string,
  planId: string,
  type: SubscriptionType
) => {
  const res = await axios.post<StripePlans>(
    `${server_url}/api/v1/stripe/update_subscription_plan`,
    {
      subscriptionId,
      planId,
      type
    }
  )

  if (res.status === 200) {
    return res.data
  } else {
    throw Error('Stripe Subscription update error')
  }
}

export const createAmountSubscription = async (
  amount: number,
  customerId: string,
  userId: string
) => {
  const res = await axios.post<Array<StripePlans>>(
    `${server_url}/api/v1/stripe/update_storage_plan_price`,
    {
      amount,
      customerId,
      userId
    }
  )
  if (res.status === 200) {
    return res.data
  } else {
    throw Error('Stripe Subscription update error')
  }
}
export const getSubscription = async (customerId: string) => {
  const res = await axios.get<{ object: 'list'; data: Array<Subscription> }>(
    `${server_url}/api/v1/stripe/subscription`,
    {
      params: { customerId }
    }
  )

  if (res.status === 200) {
    const data = res.data
    if (data.object !== 'list') {
      throw Error('Invalid subscription data')
    }

    const subscriptionList = data.data

    return subscriptionList[0]
  } else {
    throw Error('Failed to fetch subscription')
  }
}

export const getProductsWithPlans = async () => {
  const products: any = await getProducts()

  const planRequests: Array<
    Promise<{
      productId: string
      plans: Array<StripePlans>
    }>
  > = products.map((product: Product) =>
    getPlans(product.id).then((plans: Array<StripePlans>) => ({
      productId: product.id,
      plans
    }))
  )

  const plans = await Promise.all(planRequests)
  const productPlans: {
    [productId: string]: Array<StripePlans>
  } = plans.reduce(
    (acc: {}, res: { productId: string; plans: Array<StripePlans> }) => {
      return { ...acc, [res.productId]: res.plans }
    },
    {}
  )

  return { products, plans: productPlans }
}
