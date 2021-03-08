export enum SharingPrivacies {
  open,
  strict
}

export enum WatermarkStyles {
  single,
  repeat
}

export enum WatermarkControls {
  none,
  all,
  invoices,
  portfolios
}

export enum SubscriptionTypes {
  CREATOR = 'creator',
  PRO = 'pro',
  TEAM = 'team',
  BUSINESS = 'business'
}

export enum SubscriptionDurations {
  YEARLY = 'year',
  MONTHLY = 'month'
}

export enum InvoiceStatuses {
  PENDING = 'pending',
  VIEWED = 'viewed',
  PAID = 'paid'
}

export enum ProjectStatuses {
  PENDING = 'pending',
  PAID = 'paid',
  ARCHIVED = 'archived'
}
