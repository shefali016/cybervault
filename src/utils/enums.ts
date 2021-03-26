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
  BUSINESS = 'business',
  STORAGE = 'storage'
}

export enum SubscriptionDurations {
  YEARLY = 'year',
  MONTHLY = 'month'
}

export enum InvoiceStatuses {
  PENDING = 'Pending',
  VIEWED = 'Viewed',
  PAID = 'Paid'
}

export enum ProjectStatuses {
  PROGRESS = 'In progress',
  PAID = 'Paid',
  ARCHIVED = 'Archived'
}

export enum UploadStatuses {
  UPLOADING = 'Uploading',
  PAUSED = 'Paused',
  FAILED = 'Failed',
  COMPLETE = 'Complete'
}

export enum ProjectFilters {
  RECENT = 'recent',
  ACTIVE = 'active',
  ARCHIVED = 'archived'
}
