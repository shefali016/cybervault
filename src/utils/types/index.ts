import { ChangeEvent } from 'react'

export type InputChangeEvent = ChangeEvent<HTMLInputElement>

export type ButtonConfig = {
  title: string
  onClick: (params: any) => void
  icon?: any
}

export type Tab = { id: string; icon: any; text: string }

export type Asset = {
  id: string
  width?: number
  height?: number
  original?: any
}

export type Account = {
  id: string
  owner: string // id of user
  type: 'creator' | 'client'
}

export type User = {
  id: string
  email: string
  accounts: Array<string> // ids of accounts,
  mainAccount: string // Id of user's main account
  avatar?: string | undefined
  name?: string
  birthday?: string
  company?: string | undefined
  instagram?: string | undefined
  facebook?: string | undefined
  twitter?: string | undefined
  linkedIn?: string | undefined
}

export type AuthUser = {
  uid: string
  email: string
  name?: string
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
}

export type MediaObject = {
  id?: string,
  original?: boolean,
  url?: string,
  width?: number,
  height?: number
}

export type Project = {
  logo: any
  campaignName: string
  startDate: Date
  clientId: string
  objective: string
  deadline: Date
  tasks: Array<Task>
  description: string
  campaignBudget: number
  expensesEstimate: number
  expenses: Array<Expense>
  milestones: Array<Milestone>
  createdAt: Date
  updatedAt: Date
  id: string
  campaignDate: string
  videos: Array<MediaObject>,
  images: Array<MediaObject>
}

export type AllProjects = Array<Project>
