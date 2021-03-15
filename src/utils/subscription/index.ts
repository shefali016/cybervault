import { SubscriptionTypes } from 'utils/enums'
import {
  Product,
  Subscription,
  SubscriptionDetails,
  SubscriptionType
} from 'utils/Interface'

export const getSubscriptionDetails = (
  type: SubscriptionType | undefined
): SubscriptionDetails => {
  switch (type) {
    case SubscriptionTypes.CREATOR:
      return {
        name: 'Creator',
        description: 'Best for freelancers starting out',
        numProjects: 1,
        transactionFee: '7%',
        features: [
          '1 project per month',
          '7% security transaction fee',
          '5GB storage'
        ],
        extraFeatures: [
          'Secure invoicing transactions',
          'Content theft protection',
          'Auto crop downloadable content'
        ],
        storage: 5
      }
    case SubscriptionTypes.PRO:
      return {
        name: 'Pro',
        description: 'Most popular for small production agencies',
        transactionFee: '7%',
        numProjects: 10,
        features: [
          '10 projects per month',
          '7% security transaction fee',
          '50GB storage'
        ],
        extraFeatures: [
          'Secure invoicing transactions',
          'Content theft protection',
          'Auto crop downloadable content',
          'Customizable portfolio sharing',
          'Personalized watermark',
          'Additional storage plans'
        ],
        storage: 50
      }
    case SubscriptionTypes.TEAM:
      return {
        name: 'Team',
        description: 'For media empires seeking endless capabilities.',
        transactionFee: '7%',
        numProjects: 100,
        features: [
          '100 project per month',
          '7% security transaction fee',
          '150GB storage'
        ],
        extraFeatures: [
          'Secure invoicing transactions',
          'Content theft protection',
          'Auto crop downloadable content',
          'Customizable portfolio sharing',
          'Personalized watermark',
          'Additional storage plans'
        ],
        storage: 150
      }
    case SubscriptionTypes.BUSINESS:
      return {
        name: 'Business',
        description: '',
        transactionFee: '',
        numProjects: 0,
        features: [],
        storage: 0
      }
    default:
      return {
        name: 'Unsubscribed',
        description: '',
        transactionFee: '',
        numProjects: 1,
        features: [],
        storage: 10
      }
  }
}

export const findProductWithType = (
  products: Array<Product>,
  type: SubscriptionType
): Product | undefined => {
  return products.find((product) => {
    return product.metadata.type === type
  })
}

export const getSubscriptionType = (
  subscription: Subscription
): SubscriptionType => subscription?.metadata?.type
