import { SharingPrivacy, WatermarkStyle, WatermarkControl } from './types'

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
