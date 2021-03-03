import { SubscriptionDurations, SubscriptionTypes } from 'utils/enums'
import { SubscriptionType } from 'utils/Interface'

export const getSubscriptionDetails = (
  type: SubscriptionType
): {
  name: string
  description: string
  prices: {
    [key in SubscriptionDurations]: string
  }
  features: Array<string>
  extraFeatures?: Array<string>
  storage: number
} => {
  switch (type) {
    case SubscriptionTypes.creator:
      return {
        name: 'Creator',
        description: 'Best for freelancers starting out',
        prices: {
          [SubscriptionDurations.monthly]: '0.00',
          [SubscriptionDurations.yearly]: '0.00'
        },
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
    case SubscriptionTypes.pro:
      return {
        name: 'Pro',
        description: 'Most popular for small production agencies',
        prices: {
          [SubscriptionDurations.monthly]: '29.99',
          [SubscriptionDurations.yearly]: '359.99'
        },
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
    case SubscriptionTypes.team:
      return {
        name: 'Team',
        description: 'For media empires seeking endless capabilities.',
        prices: {
          [SubscriptionDurations.monthly]: '59.99',
          [SubscriptionDurations.yearly]: '719.99'
        },
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
    case SubscriptionTypes.business:
      return {
        name: 'Business',
        description: '',
        prices: {
          [SubscriptionDurations.monthly]: '',
          [SubscriptionDurations.yearly]: ''
        },
        features: [],
        storage: 0
      }
    default:
      return {
        name: '',
        description: '',
        prices: {
          [SubscriptionDurations.monthly]: '',
          [SubscriptionDurations.yearly]: ''
        },
        features: [],
        storage: 0
      }
  }
}

export const getSubscriptionPlanType = (planId: string | any) => {
  switch (planId) {
    case 'price_1INRiKKwQrkiELoILmCH3mTI':
      return SubscriptionTypes.pro
    case 'price_1INRn5KwQrkiELoIww2rXZ0U':
      return SubscriptionTypes.team
    default:
      return SubscriptionTypes.creator
  }
}
