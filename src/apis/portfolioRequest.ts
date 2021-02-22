import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { Portfolio, PortfolioFolder, Project } from 'utils/Interface'
import { generateUid } from 'utils'
import { getProjectDetailsRequest } from './projectRequest'

/**
 * @updatePortfoliFolder
 */
export const updatePortfolioFolderRequest = async (
  folder: PortfolioFolder,
  account: Account
) => {
  try {
    let id: string
    if (!folder.id) {
      id = generateUid()
    } else {
      id = folder.id
    }
    const folderData: PortfolioFolder = {
      ...folder,
      id
    }
    await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('PortfolioFolders')
      .doc(folderData.id)
      .set(folderData)
    return folderData
  } catch (error) {
    console.log('Errooorrrrr', error)
    return error
  }
}

/**
 * @getAllPortfoliFolder
 */
export const getPortfolioFolderRequest = async (account: Account) => {
  try {
    let folderList: Array<PortfolioFolder> = []
    let portfolioData: Map<string, Portfolio> | any
    const data: Document | any = await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('PortfolioFolders')
      .get()

    const portfolios: Map<string, Portfolio> | any = []
    for (const doc of data.docs) {
      let folderData: PortfolioFolder = doc.data()
      for (let index = 0; index < doc.data().portfolios.length; index++) {
        const portfolioId = doc.data().portfolios[index]
        const portfolioData = await firebase
          .firestore()
          .collection('AccountData')
          .doc(account.id)
          .collection('Portfolio')
          .doc(portfolioId)
          .get()
        const portfolio = portfolioData.data()
        portfolios.push({ ...portfolio, folderId: folderData.id })
      }
      folderList.push(folderData)
    }
    const result = {
      folderList: folderList,
      portfolios: portfolios
    }
    return result
  } catch (error) {
    console.log('Errooorrrrr', error)
    return error
  }
}

/**
 * @deletePortfoliFolder
 */
export const deletePortfolioFolderRequest = async (
  folderId: string,
  account: Account
) => {
  try {
    return firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('PortfolioFolders')
      .doc(folderId)
      .delete()
  } catch (error) {
    console.log('Errooorrrrr', error)
    return error
  }
}

/**
 * @updatePortfoli
 */
export const updatePortfolioRequest = async (
  portfolio: Portfolio,
  account: Account
) => {
  try {
    let id: string
    if (!portfolio.id) {
      id = generateUid()
    } else {
      id = portfolio.id
    }
    const portfolioData: Portfolio = {
      ...portfolio,
      id
    }
    await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('Portfolio')
      .doc(portfolioData.id)
      .set(portfolioData)
    return portfolioData.id
  } catch (error) {
    console.log('Errooorrrrr', error)
    return error
  }
}

/**
 * @getPortfolio
 */
export const getPortfolioRequest = async (
  portfolioId: string,
  account: Account
) => {
  try {
    const portfolioData: Document | any = await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('Portfolio')
      .doc(portfolioId)
      .get()
    const portfolio = portfolioData.data()
    const portfolioPorijects = portfolioData.data().projects
    let projectDataList: Array<Project> = []
    for (let index = 0; index < portfolioPorijects.length; index++) {
      const projectId = portfolioPorijects[index]
      const projects: Project | any = await getProjectDetailsRequest(
        account,
        projectId
      )
      projectDataList.push(projects)
    }
    const result = {
      portfolio,
      projectDataList
    }
    return result
  } catch (error) {
    console.log('Errooorrrrr', error)
    return error
  }
}
