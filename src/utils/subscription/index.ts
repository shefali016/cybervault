import { SubscriptionTypes } from 'utils/enums'
import { Product, Subscription, SubscriptionType } from 'utils/Interface'

export const getSubscriptionDetails = (
  type: SubscriptionType
): {
  name: string
  description: string
  features: Array<string>
  extraFeatures?: Array<string>
  storage: number
} => {
  switch (type) {
    case SubscriptionTypes.CREATOR:
      return {
        name: 'Creator',
        description: 'Best for freelancers starting out',
        features: [
          '1 project per month',
          'Secure invoicing transactions',
          'Content theft protection',
          '7% security transaction fee',
          'Auto crop downloadable content',
          '5GB storage'
        ],
        storage: 5
      }
    case SubscriptionTypes.PRO:
      return {
        name: 'Pro',
        description: 'Most popular for small production agencies',
        features: [
          '10 projects per month',
          'Secure invoicing transactions',
          'Content theft protection',
          '7% security transaction fee',
          'Auto crop downloadable content',
          '50GB storage'
        ],
        extraFeatures: [
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
        features: [
          '1 project per month',
          'Secure invoicing transactions',
          'Content theft protection',
          '7% security transaction fee',
          'Auto crop downloadable content',
          '150GB storage'
        ],
        extraFeatures: [
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
        features: [],
        storage: 0
      }
    default:
      return {
        name: '',
        description: '',
        features: [],
        storage: 0
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
): SubscriptionType => subscription.metadata.type
