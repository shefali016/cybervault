import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { PortfolioFolder } from 'utils/Interface'
import { generateUid } from 'utils'

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
    const data: Document | any = await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('PortfolioFolders')
      .get()

    for (const doc of data.docs) {
      folderList.push(doc.data())
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
