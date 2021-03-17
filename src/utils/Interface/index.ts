import { StripeElementChangeEvent } from '@stripe/stripe-js'
import { ChangeEvent } from 'react'
import PortfolioFolderScreen from 'screens/DashboardScreens/PortfolioFolderScreen'
import {
  InvoiceStatuses,
  ProjectStatuses,
  SharingPrivacies,
  SubscriptionDurations,
  SubscriptionTypes,
  UploadStatuses,
  WatermarkControls,
  WatermarkStyles
} from 'utils/enums'
import firebase from 'firebase'

export type SubscriptionType =
  | SubscriptionTypes.CREATOR
  | SubscriptionTypes.PRO
  | SubscriptionTypes.TEAM
  | SubscriptionTypes.BUSINESS
  | SubscriptionTypes.STORAGE

export type SubscriptionDuration =
  | SubscriptionDurations.YEARLY
  | SubscriptionDurations.MONTHLY

export type WatermarkControl =
  | WatermarkControls.none
  | WatermarkControls.portfolios
  | WatermarkControls.invoices
  | WatermarkControls.all

export type WatermarkStyle = WatermarkStyles.single | WatermarkStyles.repeat

export type SharingPrivacy = SharingPrivacies.open | SharingPrivacies.strict

export type Region = {
  code: string
  name: string
  flag: string
  currencySymbol: string
  currencyCode: string
}

export type InputChangeEvent = ChangeEvent<HTMLInputElement>

export type ButtonConfig = {
  title: string
  onClick: (params: any) => void
  icon?: any
}

export type Tab = { id: string; icon?: any; text: string; onPress?: () => void }

export type BankingDetails = {} // @todo R&D what details we need from user to deposit from Stripe

export type StripeAccount = {
  id: string
  object: 'account'
  charges_enabled: boolean
  details_submitted: boolean
  payouts_enabled: boolean
  email: string
  country: string
}

export interface StripeCustomer {
  id: string
  object: 'customer'
  address: string | null
  balance: number
  created: number
  currency: string
  default_source: string | null
  delinquent: boolean
  description: string
  discount: string | null
  email: string | null
  invoice_prefix: string
  invoice_settings: {
    custom_fields: null
    default_payment_method: null
    footer: null
  }
  livemode: boolean
  metadata: {}
  name: string | null
  next_invoice_sequence: number
  phone: string | null
  preferred_locales: []
  shipping: string | null
  tax_exempt?: 'none'
}

export interface StripeLoginLink {
  object: string
  created: number
  url: string
  id: string
}

export type StripeAccountLink = {
  url: string
  object: 'account_link'
  created: number
  expires_at: number
}
export interface Product {
  id: string
  object: 'product'
  active: boolean
  created: number
  description: string | null
  images: Array<string>
  livemode: boolean
  metadata: {
    type: SubscriptionType
  }
  name: string
  statement_descriptor: string | null
  unit_label: string | null
  updated: number
}
export interface StripePlans {
  id: string
  object: string
  active: boolean
  aggregate_usage: any | null
  amount: number
  amount_decimal: string
  billing_scheme: string
  created: number
  currency: string
  interval: string
  interval_count: number
  livemode: boolean
  metadata: { type: SubscriptionType }
  nickname: any | null
  product: string
  tiers_mode: any | null
  transform_usage: any | null
  trial_period_days: any | null
  usage_type: string
}

export interface SubscriptionDetails {
  name: string
  description: string
  features: Array<string>
  extraFeatures?: Array<string>
  storage: number
  numProjects: number
  transactionFee: string
}

export interface Subscription {
  id: string
  object: 'subscription'
  application_fee_percent: null
  billing_cycle_anchor: number
  billing_thresholds: null
  cancel_at: null
  cancel_at_period_end: boolean
  canceled_at: null
  collection_method: 'charge_automatically'
  created: number
  current_period_end: number
  current_period_start: number
  customer: string
  days_until_due: null
  default_payment_method: null
  default_source: null
  default_tax_rates: []
  discount: null
  ended_at: null
  items: {
    object: 'list'
    data: [
      {
        id: string
        object: 'subscription_item'
        billing_thresholds: null
        created: number
        metadata: {}
        price: {
          id: StripeElementChangeEvent
          object: 'price'
          active: boolean
          billing_scheme: 'per_unit'
          created: number
          currency: 'cad'
          livemode: false
          lookup_key: null
          metadata: {}
          nickname: null
          product: string
          recurring: {
            aggregate_usage: null
            interval: 'month'
            interval_count: number
            usage_type: 'licensed'
          }
          tiers_mode: null
          transform_quantity: null
          type: 'recurring'
          unit_amount: number
          unit_amount_decimal: string
        }
        quantity: number
        subscription: string
        tax_rates: []
      }
    ]
    has_more: boolean
    url: string
  }
  latest_invoice: null
  livemode: boolean
  metadata: { type: SubscriptionType; extraStorage?: string }
  next_pending_invoice_item_invoice: null
  pause_collection: null
  pending_invoice_item_interval: null
  pending_setup_intent: null
  pending_update: null
  schedule: null
  start_date: number
  status: 'active'
  transfer_data: null
  trial_end: null
  trial_start: null
}

export interface StripeInvoice {
  id: string
  object: Object
  account_country: string
  account_name: string
  account_tax_ids: null
  amount_due: number
  amount_paid: number
  amount_remaining: number
  application_fee_amount: null
  attempt_count: number
  attempted: boolean
  auto_advance: boolean
  billing_reason: string
  charge: string
  collection_method: string
  created: number
  currency: string
  custom_fields: null
  customer: string
  customer_address: null
  customer_email: string
  customer_name: string
  customer_phone: null
  customer_shipping: null
  customer_tax_exempt: null
  customer_tax_ids: Array<string>
  default_payment_method: null
  default_source: null
  default_tax_rates: Array<string>
  description: null
  discount: null
  discounts: Array<string>
  due_date: null
  ending_balance: number
  footer: null
  hosted_invoice_url: string
  lines: {
    data: [
      {
        id: string
        object: string
        amount: number
        currency: number
        description: number
        discount_amounts: Array<string>
        discountable: boolean
        discounts: Array<string>
        livemode: boolean
        metadata: Object
        period: {
          end: number
          start: number
        }
        price: {
          id: string
          object: Object
          active: boolean
          billing_scheme: string
          created: number
          currency: string
          livemode: boolean
          lookup_key: null
          metadata: Object
          nickname: null
          product: string
          recurring: {
            aggregate_usage: null
            interval: string
            interval_count: number
            usage_type: string
          }
          tiers_mode: null
          transform_quantity: null
          type: string
          unit_amount: number
          unit_amount_decimal: number
        }
        proration: boolean
        quantity: number
        subscription: string
        subscription_item: string
        tax_amounts: Array<string>
        tax_rates: Array<string>
        type: string
      }
    ]
    has_more: boolean
    object: string
    url: string
  }
  livemode: boolean
  metadata: object
  next_payment_attempt: null
  number: number
  on_behalf_of: null
  paid: boolean
  payment_intent: string
  payment_settings: {
    payment_method_options: null
    payment_method_types: null
  }
  period_end: number
  period_start: number
  post_payment_credit_notes_amount: number
  pre_payment_credit_notes_amount: number
  receipt_number: null
  starting_balance: number
  statement_descriptor: null
  status: string
  status_transitions: {
    finalized_at: number
    marked_uncollectible_at: null
    paid_at: number
    voided_at: null
  }
  subscription: string
  subtotal: number
  tax: null
  total: number
  total_discount_amounts: Array<string>
  total_tax_amounts: Array<string>
  transfer_data: null
  webhooks_delivered_at: null
}

export type Account = {
  id: string
  owner: string // id of user
  type: 'creator' | 'client'
  region?: Region
  name: string
  security: {
    twoFactorEnabled: boolean
    textMessageVerification: boolean
    securityQuestion: { question: string; answer: string }
  }
  stripe: {
    accountId: string | null
    detailsSubmitted: boolean
    payoutsEnabled: boolean
  }
  settings: {
    sharingPrivacy: SharingPrivacy
    watermarkStyle: WatermarkStyle
    watermarkControl: WatermarkControl
    watermark?: string
  }
  branding: {
    email: {
      foregroundColor: string
      backgroundColor: string
      text: string
      buttonBackgroundColor: string
      buttonTextColor: string
    }
    portfolio: {
      backgroundColor: string
      foregroundColor: string
      text: string
      headerGradient1: string
      headerGradient2: string
    }
  }
}

export type User = {
  id: string
  email: string
  accounts: Array<string> // ids of accounts,
  mainAccount: string // Id of user's main account
  avatar?: string | undefined
  name: string
  birthday?: string
  company?: string | undefined
  instagram?: string | undefined
  facebook?: string | undefined
  twitter?: string | undefined
  linkedIn?: string | undefined
  customerId: string
}

export type AuthUser = {
  uid: string
  email: string
  name?: string | null
}

export type UserLoginInfo = {
  email: string
  password: string
  name?: string
}

export type Task = {
  id: string
  title: string
  startDate: string
  endDate: string
}

export type Expense = {
  id: string
  title: string
  cost: number
}

export type Milestone = {
  id: string
  title: string
  payment: number //added as in fireabase when creating milestone payment key is used for cost
}

export type AssetFile = {
  id: string
  original?: boolean
  url: string
  width: number
  height: number
}

export type Project = {
  campaignName: string
  campaignDate: string
  clientId: string
  campaignObjective: string
  campaignDeadLine: string
  tasks: Array<Task>
  description: string
  campaignBudget: number
  expensesEstimate?: number
  campaignExpenses: number
  expenses: Array<Expense>
  milestones: Array<Milestone>
  createdAt?: Date | string
  updatedAt?: Date | string
  id: string
  videos: Array<string>
  images: Array<string>
  canInvoice: Boolean
  status: ProjectStatus
  featuredImage?: string
}

export type InvoiceConversation = {
  name: string
  senderId: string
  sendersEmail: string
  message: string
  date: Date | string
  id: string
  receiversEmail: string
}

export type InvoiceUserInfo = {
  name: string
  id: string
  email: string
}

export type Invoice = {
  id: string // Using generateId function
  dateCreated: Date | string
  projectName: string
  datePaid: Date | null
  projectId: string // Id of the project being invoiced
  accountId: string
  clientId: string
  price: number // Amount that the client must pay
  milestones: Array<Milestone> | null // will contain milestones being invoiced or null if invoicing total amount
  isPaid: Boolean
  status: InvoiceStatuses
  conversation?: Array<InvoiceConversation>
}

export type ProjectStatus =
  | ProjectStatuses.PROGRESS
  | ProjectStatuses.PAID
  | ProjectStatuses.ARCHIVED

export type InvoiceStatus =
  | InvoiceStatuses.PENDING
  | InvoiceStatuses.VIEWED
  | InvoiceStatuses.PAID

export interface Asset {
  id: string
  files: Array<AssetFile>
  fileName: string
  type: string
}

export type Client = {
  id: string // Randomly generated
  name: string
  email: string
  address: string
  city: string
  state: string
  country: string
  logo: any
}

export type AllProjects = Array<Project>

export interface PortfolioFolderCache {
  [id: string]: PortfolioFolder
}

export interface PortfolioCache {
  [id: string]: Portfolio
}

export interface PortfolioFolder {
  id: string
  name: string
  description?: string
  portfolios: Array<string>
  createdAt: number
}

export interface Portfolio {
  id: string
  name: string
  description?: string
  icon?: string | null
  projects: Array<string> // project ids
  folderId: string
  createdAt?: number
}

export interface PortfolioShare {
  id: string
  accountId: string
  portfolioId: string
  title: string
  description: string | undefined
  createdAt: number
  isViewed: boolean
}

export type Cell = {
  cellProps?: any
  renderer?: () => React.ReactElement
  title?: string
  key: string
}

export type Mail = {
  to: string
  data: Object
  templateId: string
  type: string
}

export type MailTemplate = {
  id: string
  type: string
}

export type PortfolioShareMailData = {
  foregroundColor: string
  backgroundColor: string
  textColor: string
  buttonBackgroundColor: string
  buttonTextColor: string
  link: string
  sender: string
  contentDesc: string
  logo: string
  portfolioName: string
}

export type Row = {
  key: string
  row: Array<Cell>
}

export type Branding = {
  email: {
    foregroundColor: string
    backgroundColor: string
    text: string
    buttonBackgroundColor: string
    buttonTextColor: string
  }
  portfolio: {
    backgroundColor: string
    foregroundColor: string
    text: string
    headerGradient1: string
    headerGradient2: string
  }
}

export interface Notification {
  id: string
  type: 'portfolioViewed'
  createdAt: number
  title: string
  isRead: boolean
}

export type UploadCache = { [assetId: string]: AssetUpload }
export type AssetUpload = {
  asset: Asset
  task: firebase.storage.UploadTask
  status: UploadStatuses
  progress: number
}
