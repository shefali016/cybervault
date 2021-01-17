import {
  SharingPrivacy,
  WatermarkStyle,
  WatermarkControl,
  SubscriptionType,
  SubscriptionDuration
} from './types'

export const SharingPrivacies: {
  open: SharingPrivacy
  strict: SharingPrivacy
} = {
  open: 'open',
  strict: 'strict'
}

export const WatermarkStyles: {
  single: WatermarkStyle
  repeat: WatermarkStyle
} = {
  single: 'single',
  repeat: 'repeat'
}

export const WatermarkControls: {
  none: WatermarkControl
  all: WatermarkControl
  invoices: WatermarkControl
  portfolios: WatermarkControl
} = {
  none: 'none',
  all: 'all',
  invoices: 'invoices',
  portfolios: 'portfolios'
}

export const SubscriptionTypes: {
  creator: SubscriptionType
  pro: SubscriptionType
  team: SubscriptionType
  business: SubscriptionType
} = {
  creator: 'creator',
  pro: 'pro',
  team: 'team',
  business: 'business'
}

export const SubscriptionDurations: {
  yearly: SubscriptionDuration
  monthly: SubscriptionDuration
} = {
  yearly: 'yearly',
  monthly: 'monthly'
}
