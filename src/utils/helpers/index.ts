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
