import { ChangeEvent } from 'react'

export type InputChangeEvent = ChangeEvent<HTMLInputElement>

export type Asset = {
  id: string
  width?: number
  height?: number
  original?: any
}

export type User = {
  email: string
  accounts: Array<string> // ids of accounts,
  mainAccount: string // Id of user's main account
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
  name: string
  startDate: Date
  clientId: string
  objective: string
  deadline: Date
  tasks: Array<Task>
  description: string
  budget: number
  expensesEstimate: number
  expenses: Array<Expense>
  milestones: Array<Milestone>
  createdAt: Date
  updatedAt: Date
  id: string
}

export type Account = {
  id: string
  owner: string // id of user
  type: 'creator' | 'client'
}
