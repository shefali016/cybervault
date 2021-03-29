import { Expense, Milestone, Project, Task } from 'utils/Interface'
import moment from 'moment'

export default function validate(
  step: number,
  projectData: Project,
  clientData: any
) {
  const invalidString = (str: string) => str.trim() === ''

  switch (step) {
    case 1:
      if (invalidString(clientData.id)) {
        return true
      }
      break
    case 2:
      if (
        invalidString(projectData.campaignName) ||
        invalidString(projectData.campaignDate) ||
        invalidString(projectData.campaignObjective) ||
        invalidString(projectData.campaignDeadLine) ||
        !!projectData.tasks.find(
          ({ title, startDate, endDate }: Task) =>
            invalidString(title) ||
            invalidString(startDate) ||
            invalidString(endDate)
        )
      ) {
        return true
      }
      break
    case 3:
      if (
        !projectData.campaignBudget ||
        invalidString(projectData.campaignBudget.toString()) ||
        !projectData.campaignExpenses ||
        invalidString(projectData.campaignExpenses.toString()) ||
        !!projectData.expenses.find(
          ({ title, cost }: Expense) =>
            invalidString(title) || invalidString(cost.toString())
        )
      ) {
        return true
      }
      break
    case 4:
      if (
        !!projectData.milestones.find(
          ({ title, payment }: Milestone) =>
            invalidString(title) || invalidString(payment.toString())
        )
      ) {
        return true
      }
      break
    default:
      return false
  }
}

export const getImageObject = (
  file: File,
  url: string,
  height: number,
  width: number,
  assetId: string,
  id: string
) => {
  return {
    assetId: assetId,
    id: id,
    original: true,
    url: url,
    width: width,
    height: height,
    size: file.size,
    createdAt: Date.now()
  }
}

export const getTextColor = (color: any) => {
  // Variables for red, green, blue values
  var r, g, b, hsp

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If RGB --> store the red, green, blue values in separate variables
    color = color.match(
      /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
    )

    r = color[1]
    g = color[2]
    b = color[3]
  } else {
    // If hex --> Convert it to RGB: http://gist.github.com/983661
    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'))

    r = color >> 16
    g = (color >> 8) & 255
    b = color & 255
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

  // Using the HSP value, determine whether the color is light or dark
  if (hsp > 140.5) {
    return 'light'
  } else {
    return 'dark'
  }
}

export const validateAddClient = (clientData: any) => {
  if (
    clientData.name.trim() === '' ||
    clientData.email.trim() === '' ||
    clientData.address.trim() === '' ||
    clientData.city.trim() === '' ||
    clientData.state.trim() === '' ||
    clientData.address.trim() === '' ||
    clientData.country.trim() === ''
  ) {
    return true
  }
}

type PasswordType = {
  newPassword: string
  confirmPassword: string
  currentPassword: string
}

export const validatePassword = (data: PasswordType) => {
  let errors: any
  errors = {}
  if (data.hasOwnProperty('newPassword')) {
    if (data.newPassword == '') {
      errors.newPassword = 'Enter a password'
    } else if (data.newPassword && data.newPassword.length < 6) {
      errors.newPassword = 'Password should not be less than 6 characters'
    }
  }
  if (data.hasOwnProperty('confirmPassword')) {
    if (data.confirmPassword == '') {
      errors.confirmPassword = 'Confirm your password'
    } else if (data.confirmPassword !== data.newPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
  }
  if (data.hasOwnProperty('currentPassword')) {
    if (data.currentPassword == '') {
      errors.currentPassword = 'Enter current password'
    } else if (data.currentPassword && data.currentPassword.length < 6) {
      errors.currentPassword = 'Password should not be less than 6 characters'
    }
  }
  return errors
}

export const findProjectLimit = (allProjectsData: Array<Project>) => {
  let curentMonthProjects = []
  for (let index = 0; index < allProjectsData.length; index++) {
    const element = allProjectsData[index]
    if (moment().isSame(element.createdAt, 'month')) {
      curentMonthProjects.push(element)
    }
  }
  return curentMonthProjects.length
}
export const formatBytes = (bytes: number) => {
  let decimals = 2
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const bytesToGB = (bytes: number) => bytes / Math.pow(10, 9)

export const getAvailableStorage = (
  usedStorage: number,
  totalStorage: number
) => {
  const sizeInGb: number = bytesToGB(usedStorage)
  const usedStoragePercent: number = (sizeInGb / totalStorage) * 100
  const availablePercentage: number = 100 - usedStoragePercent
  return {
    usedStoragePercent,
    availablePercentage
  }
}
