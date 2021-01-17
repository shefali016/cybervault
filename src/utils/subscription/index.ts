import { SubscriptionTypes } from 'utils/enums'
import { SubscriptionType } from 'utils/types'

export const getSubscriptionDetails = (
  type: SubscriptionType
): { name: string } => {
  switch (type) {
    case SubscriptionTypes.creator:
      return { name: 'Creator' }
    case SubscriptionTypes.pro:
      return { name: 'Pro' }
    case SubscriptionTypes.team:
      return { name: 'Team' }
    case SubscriptionTypes.business:
      return { name: 'Business' }
    default:
      return {
        name: ''
      }
  }
}
