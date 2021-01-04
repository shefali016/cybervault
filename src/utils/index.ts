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
  return {
    logo: '',
    campaignName: '',
    campaignDate: '',
    clientName: '',
    clientEmail: '',
    address: '',
    city: '',
    state: '',
    country: '',
    campaignObjective: '',
    campaignDeadLine: '',
    description: '',
    tasks: [
      {
        id: '0',
        task: '',
        startDate: '',
        endDate: ''
      }
    ],
    campaignBudget: '',
    campaignExpenses: '',
    expenses: [
      {
        id: '0',
        expense: '',
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
    pin: ''
  }
}
