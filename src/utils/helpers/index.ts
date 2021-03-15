import { Project } from 'utils/Interface'
import moment from 'moment'

export default function validate(
  step: number,
  projectData: any,
  clientData: any
) {
  switch (step) {
    case 1:
      if (clientData.id.trim() === '') {
        return true
      }
      break
    case 2:
      if (
        projectData.campaignName.trim() === '' ||
        projectData.campaignDate.trim() === '' ||
        projectData.campaignObjective.trim() === '' ||
        projectData.campaignDeadLine.trim() === ''
      ) {
        return true
      }
      break
    case 3:
      if (
        projectData.campaignBudget.trim() === '' ||
        projectData.campaignExpenses.trim() === ''
      ) {
        return true
      }
      break
    default:
      return false
  }
}

export const getImageObject = (file: any, url: string, id: string) => {
  return {
    id: id,
    original: true,
    url: url,
    width: 50,
    height: 50
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
