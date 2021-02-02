export default function validate(step: number, projectData: any) {

  switch (step) {
    case 1:
      if (
        projectData.clientName.trim() === '' ||
        projectData.clientEmail.trim() === '' ||
        projectData.address.trim() === '' ||
        projectData.city.trim() === '' ||
        projectData.state.trim() === '' ||
        projectData.country.trim() === ''
      ) {
        return true
      }
      break
    case 2:
      if (
        projectData.campaignName.trim() === '' ||
        projectData.campaignDate.trim() === '' 
      ) {
        return true
      }
      break

    case 3:
      if (
        projectData.campaignObjective.trim() === '' ||
        projectData.campaignDeadLine.trim() === ''
      ) {
        return true
      }
      break
    case 4:
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
