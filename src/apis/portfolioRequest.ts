import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { Portfolio, PortfolioFolder } from 'utils/types'
import { generateUid } from 'utils'

/**
 * @updatePortfoliFolder
 */
export const updatePortfolioFolderApi = async (
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
export const getPortfolioFolderApi = async (account: Account) => {
  try {
    let folderList: Array<PortfolioFolder> = []
    const data: Document | any = await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('PortfolioFolders')
      .get()

    for (const doc of data.docs) {
      let folderData: PortfolioFolder = doc.data()
      const portfolios: Array<Portfolio> | any = []
      for (let index = 0; index < doc.data().portfolios.length; index++) {
        const portfolioId = doc.data().portfolios[index]
        const portfolioData = await firebase
          .firestore()
          .collection('AccountData')
          .doc(account.id)
          .collection('Portfolio')
          .doc(portfolioId)
          .get()
        portfolios.push(portfolioData.data())
      }
      folderData = {
        ...folderData,
        portfolios
      }
      folderList.push(folderData)
    }
    return folderList
  } catch (error) {
    console.log('Errooorrrrr', error)
    return error
  }
}

/**
 * @deletePortfoliFolder
 */
export const deletePortfolioFolderApi = async (
  folderId: string,
  account: Account
) => {
  try {
    await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('PortfolioFolders')
      .doc(folderId)
      .delete()
    return
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
