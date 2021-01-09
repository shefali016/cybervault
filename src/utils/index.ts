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
