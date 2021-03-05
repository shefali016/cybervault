import { ChangeEvent } from 'react'
import {
  InvoiceStatuses,
  ProjectStatuses,
  SharingPrivacies,
  SubscriptionDurations,
  SubscriptionTypes,
  WatermarkControls,
  WatermarkStyles
} from 'utils/enums'

export type SubscriptionType =
  | SubscriptionTypes.creator
  | SubscriptionTypes.pro
  | SubscriptionTypes.team
  | SubscriptionTypes.business

export type SubscriptionDuration =
  | SubscriptionDurations.yearly
  | SubscriptionDurations.monthly

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

export type Tab = { id: string; icon?: any; text: string }

export type Asset = {
  id: string
  width?: number
  height?: number
  original?: any
}

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
  metadata: Object
  nickname: any | null
  product: string
  tiers_mode: any | null
  transform_usage: any | null
  trial_period_days: any | null
  usage_type: string
}

export type Account = {
  id: string
  owner: string // id of user
  email: string | null
  type: 'creator' | 'client'
  region?: Region
  name?: string
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
  subscription: {
    type: SubscriptionType
    extraStorage?: number
  }
  settings: {
    sharingPrivacy: SharingPrivacy
    watermarkStyle: WatermarkStyle
    watermarkControl: WatermarkControl
    watermark?: string
  }
  branding: {
    email: {
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
  email: string | null
  accounts: Array<string> // ids of accounts,
  mainAccount: string // Id of user's main account
  avatar?: string | undefined
  name?: string | null
  birthday?: string
  company?: string | undefined
  instagram?: string | undefined
  facebook?: string | undefined
  twitter?: string | undefined
  linkedIn?: string | undefined
  customerId: string
  extraStorage?: number
}

export type AuthUser = {
  uid: string
  email: string | null
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
  cost: number
  payment: number //added as in fireabase when creating milestone payment key is used for cost
}

export type MediaObject = {
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
  createdAt?: Date
  updatedAt?: Date
  id: string
  videos: Array<MediaObject>
  images: Array<MediaObject>
  canInvoice: Boolean
  status: ProjectStatus
  featuredImage?: string
}

export type InvoiceConversation = {
  name: string
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
  id: String // Using generateId function
  dateCreated: Date | string
  datePaid: Date | null
  projectId: string // Id of the project being invoiced
  price: number // Amount that the client must pay
  milestones: Array<Milestone> | null // will contain milestones being invoiced or null if invoicing total amount
  clientEmail: String
  isPaid: Boolean
  status: InvoiceStatus
  projectName: string
  campaignDeadLine: string
  featuredImage?: string
  conversation?: Array<InvoiceConversation>
  userDetails: InvoiceUserInfo
}

export type ProjectStatus =
  | ProjectStatuses.PENDING
  | ProjectStatuses.PAID
  | ProjectStatuses.ARCHIVED

export type InvoiceStatus =
  | InvoiceStatuses.PENDING
  | InvoiceStatuses.VIEWED
  | InvoiceStatuses.PAID

export interface ProjectAsset {
  id: string
  files: Array<MediaObject>
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

export interface PortfolioFolder {
  id: string
  name: string
  description?: string
  portfolios: Array<string>
}

export interface Portfolio {
  id: string
  name: string
  description?: string
  icon?: string | null
  projects: Array<string> // project ids
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

export type Row = {
  key: string
  row: Array<Cell>
}
