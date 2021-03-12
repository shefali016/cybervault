import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import {
  Portfolio,
  PortfolioCache,
  PortfolioFolder,
  PortfolioFolderCache,
  Project
} from 'utils/Interface'
import { generateUid, sortByCreatedAt } from 'utils'
import { getProjectDetailsRequest } from './projectRequest'

/**
 * @updatePortfoliFolder
 */
export const updatePortfolioFolderRequest = async (
  folder: PortfolioFolder,
  account: Account
) => {
  try {
    const folderData: PortfolioFolder = {
      ...folder,
      id: folder.id || generateUid()
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
export const getPortfolioFolderRequest = async (
  account: Account
): Promise<{
  folderList: Array<PortfolioFolder>
  portfolios: Array<Portfolio>
  portfolioCache: PortfolioCache
  folderCache: PortfolioFolderCache
}> => {
  try {
    const data: Document | any = await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('PortfolioFolders')
      .get()

    const folderList: Array<PortfolioFolder> = []
    const portfolioList: Array<Portfolio> = []
    const portfolioCache: PortfolioCache = {}
    const folderCache: PortfolioFolderCache = {}

    for (const doc of data.docs) {
      let folderData = doc.data() as PortfolioFolder

      let portfolios: Array<Portfolio> = []

      if (folderData.portfolios) {
        for (let index = 0; index < folderData.portfolios.length; index++) {
          const portfolioId = folderData.portfolios[index]
          const portfolioData = await firebase
            .firestore()
            .collection('AccountData')
            .doc(account.id)
            .collection('Portfolio')
            .doc(portfolioId)
            .get()
          const portfolio = portfolioData.data() as Portfolio
          portfolios.push(portfolio)
          portfolioCache[portfolio.id] = portfolio
        }
      }

      portfolios = sortByCreatedAt(portfolios)

      folderCache[folderData.id] = folderData
      folderList.push(folderData)
      portfolioList.push(...portfolios)
    }
    const result = {
      folderList: sortByCreatedAt(folderList),
      portfolios: portfolioList,
      portfolioCache,
      folderCache
    }
    return result
  } catch (error) {
    console.log('getPortfolioFolderRequest error', error)
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
    console.log('deletePortfolioFolderRequest error', error)
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
    const portfolioData: Portfolio = {
      ...portfolio,
      id: portfolio.id || generateUid()
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
    console.log('updatePortfolioRequest error', error)
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
    const portfolioProjects = portfolioData.data().projects
    let projectDataList: Array<Project> = []
    for (let index = 0; index < portfolioProjects.length; index++) {
      const projectId = portfolioProjects[index]
      const projects: Project | any = await getProjectDetailsRequest(
        account.id,
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
    console.log('getPortfolioRequest error', error)
    return error
  }
}
