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

export type User = {
  id: string,
  email: string
  accounts: Array<string> // ids of accounts,
  mainAccount: string // Id of user's main account
  password: string
  avatar: string | undefined
  firstName: string
  lastName: string
  company: string | undefined
  instagram: string | undefined
  facebook: string | undefined
  twitter: string | undefined
  linkedIn: string | undefined
}

export type UserLoginInfo = {
  email: string
  password: string
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
}

export type Account = {
  id: string
  owner: string // id of user
  type: 'creator' | 'client'
}

export type AllProjects = Array<Project>
