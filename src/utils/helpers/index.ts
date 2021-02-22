export default function validate(step: number, projectData: any,clientData:any) {

  switch (step) {
    case 1:
      if (
        clientData.id.trim() === '' 
      ) {
        return true
      }
      break
    case 2:
      if (
        projectData.campaignName.trim() === '' ||
        projectData.campaignDate.trim() === ''|| 
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

export const validateAddClient=(clientData:any)=>{
  if (
    clientData.name.trim() === '' ||
    clientData.email.trim() === '' ||
    clientData.address.trim() === '' ||
    clientData.city.trim() === '' ||
    clientData.state.trim() === '' ||
    clientData.address.trim() === ''||
    clientData.country.trim() === ''
  ) {
    return true
  }
}

type PasswordType={
  newPassword:string
  confirmPassword:string
}


export const validatePassword=(data:PasswordType)=>{
  let errors:any;
  errors={}
  if(data.hasOwnProperty('newPassword')){
     if(data.newPassword==''){
          errors.newPassword='Enter Password'
     }
     else if(data.newPassword && data.newPassword.length<6){
          errors.newPassword='Password should not be less than 6 characters'
     }
  }
  if(data.hasOwnProperty('confirmPassword')){
      if(data.confirmPassword==''){
          errors.confirmPassword='Enter Confirm Password'
     }
     else if(data.confirmPassword!==data.newPassword){
          errors.confirmPassword='Password does not match'
     }
  }
  return errors
}
