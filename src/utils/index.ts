import { Theme } from '@material-ui/core/styles'

export function getWidgetCardHeight(theme: Theme) {
  return Math.min(window.outerWidth - theme.spacing(8) - 100, 200)
}

export function getCardHeight(theme: Theme) {
  return Math.min(window.outerWidth - theme.spacing(16), 300)
}

export function generateUid() {
  let S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}

export const getProductData = () => {
  const currentDate = new Date().toISOString().slice(0, 10)
  return {
    logo: '',
    campaignName: '',
    campaignDate: currentDate,
    clientName: '',
    clientEmail: '',
    address: '',
    city: '',
    state: '',
    country: '',
    campaignObjective: '',
    campaignDeadLine: currentDate,
    description: '',
    tasks: [
      {
        id: '0',
        title: '',
        startDate: '',
        endDate: ''
      }
    ],
    campaignBudget: '',
    campaignExpenses: '',
    expenses: [
      {
        id: '0',
        title: '',
        cost: ''
      }
    ],
    milestones: [
      {
        id: '0',
        title: '',
        payment: ''
      }
    ],
    id: ''
  }
}

export const getDefaultProjectData = () =>{
  const currentDate = new Date().toISOString().slice(0, 10)
  return  {
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
  }

}
