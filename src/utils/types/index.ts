export type Asset = {
  id: string,
  width?: number,
  height?: number,
  original?: any
};

export type User = {
  email: string,
  password: string
};

export type StretegyTask = {
  task: string,
  startDay: string,
  deadLine: string
}

export type StretegyExpenses = {
  expence: string,
  cost: number,
}

export type StretegyMilestone = {
  milestone: string,
  payment: number,
}

export type StepOne = {
  logo: String,
  campaignName: String,
  campaignDate: String,
  clientName: String,
  clientEmail: String,
  address: String,
  city: String,
  state: String,
  country: String
}

export type StepTwo = {
  campaignObjective: String,
  campaignDeadLine: String,
  description: String,
  tasks: Array<StretegyTask>
}

export type StepThree = {
  campaignBudget: String,
  campaignExpences: String,
  expenses: Array<StretegyExpenses>
}

export type StepFour = {
  milestone: Array<StretegyMilestone>
}

export type ProjectData = {
  stepOne: StepOne,
  stepTwo: StepTwo,
  stepThree: StepThree,
  stepFour: StepFour
}
