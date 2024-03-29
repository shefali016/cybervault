import { Theme } from '@material-ui/core/styles'
import { ProjectStatuses } from './enums'
import { Project } from './Interface'
import { Map } from 'immutable'

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const addArrayToCache = (
  cache: {},
  arr: any[],
  key: string | undefined = 'id'
) => {
  const newCache: { [id: string]: any } = { ...cache }
  arr.forEach((item: any) => {
    newCache[item[key]] = item
  })
  return newCache
}

export const addArrayToMap = (
  cache: Map<string, any>,
  arr: any[],
  key: string | undefined = 'id'
) => {
  let newCache = cache
  arr.forEach((item: any) => {
    newCache = newCache.set(item[key], item)
  })
  return newCache
}

export const addToCache = (
  cache: {},
  item: any,
  key: string | undefined = 'id'
) => {
  return { ...cache, [item[key]]: item }
}

export const replaceOrAdd = (
  arr: any[],
  item: any,
  compare: (item: any) => boolean
) => {
  const index = arr.findIndex((item: any) => compare(item))

  if (index > -1) {
    const newArr = [...arr]
    newArr[index] = item
    return newArr
  } else {
    return [...arr, item]
  }
}

export const sortByCreatedAt = (arr: Array<any>) => {
  return arr.sort((a, b) =>
    b.createdAt && a.createdAt ? b.createdAt - a.createdAt : 0
  )
}

export function getWidgetCardHeight(theme: Theme) {
  return Math.min(window.outerWidth - theme.spacing(8) - 100, 275)
}

export function getCardHeight(theme: Theme) {
  return Math.min(window.outerWidth - theme.spacing(8), 350)
}

export function generateUid() {
  let S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return S4() + S4() + S4() + S4()
}

export const getProjectData = (): Project => {
  const currentDate = new Date().toISOString().slice(0, 10)
  return {
    campaignName: '',
    campaignDate: currentDate,
    clientId: '',
    campaignObjective: '',
    campaignDeadLine: currentDate,
    description: '',
    canInvoice: true,
    tasks: [],
    campaignBudget: 0,
    campaignExpenses: 0,
    expenses: [],
    milestones: [],
    id: '',
    images: [],
    videos: [],
    status: ProjectStatuses.PROGRESS,
    createdAt: 0,
    updatedAt: 0
  }
}

export const getClientData = () => {
  return {
    address: '',
    city: '',
    state: '',
    country: '',
    email: '',
    id: '',
    name: '',
    logo: ''
  }
}

export const getDefaultProjectData = () => {
  const currentDate = new Date().toISOString().slice(0, 10)
  return {
    logo: '',
    campaignName: 'Test Campaign',
    startDate: currentDate,
    clientId: '102',
    objective: 'To go on',
    deadline: currentDate,
    tasks: [
      {
        id: '0',
        title: 'Work on',
        startDate: currentDate,
        endDate: currentDate
      }
    ],
    description: 'Start with the game',
    campaignBudget: 5000,
    expensesEstimate: 5000,
    expenses: [
      {
        id: '0',
        title: 'New',
        cost: '230'
      }
    ],
    milestones: [
      {
        id: '0',
        title: 'First',
        payment: '4000'
      }
    ],
    createdAt: currentDate,
    updatedAt: currentDate,
    id: '12',
    campaignDate: currentDate,
    clientName: 'Test name',
    clientEmail: 'test@yopmail.com',
    address: '201 ST New york',
    city: 'Newyork city',
    state: 'LA',
    country: 'United states',
    campaignObjective: 'To get our own',
    campaignExpenses: '1008',
    image: [],
    video: []
  }
}
