import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import {
  Mail,
  Portfolio,
  PortfolioCache,
  PortfolioFolder,
  PortfolioFolderCache,
  PortfolioShare,
  Project,
  Account,
  PortfolioShareMailData,
  Branding
} from 'utils/Interface'
import { generateUid, sortByCreatedAt } from 'utils'
import { getProjectDetailsRequest } from './projectRequest'
import { sendMail } from 'apis/mails'

const { domain, template_ids } = require('../config.json')

export const updatePortfolioFolderRequest = async (
  folder: PortfolioFolder,
  account: Account
) => {
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
}

export const getPortfolioFolderRequest = async (
  account: Account
): Promise<{
  folderList: Array<PortfolioFolder>
  portfolios: Array<Portfolio>
  portfolioCache: PortfolioCache
  folderCache: PortfolioFolderCache
}> => {
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
}

export const deletePortfolioFolderRequest = async (
  folderId: string,
  account: Account
) => {
  return firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('PortfolioFolders')
    .doc(folderId)
    .delete()
}

export const updatePortfolioRequest = async (
  portfolio: Portfolio,
  account: Account
) => {
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
}

export const getPortfolioRequest = async (
  portfolioId: string,
  accountId: string
): Promise<{
  portfolio: Portfolio
  projectDataList: Array<Project>
}> => {
  const portfolioData: Document | any = await firebase
    .firestore()
    .collection('AccountData')
    .doc(accountId)
    .collection('Portfolio')
    .doc(portfolioId)
    .get()
  const portfolio = portfolioData.data()
  const portfolioProjects = portfolioData.data().projects
  let projectDataList: Array<Project> = []
  for (let index = 0; index < portfolioProjects.length; index++) {
    const projectId = portfolioProjects[index]
    const projects: Project | any = await getProjectDetailsRequest(
      accountId,
      projectId
    )
    projectDataList.push(projects)
  }
  const result = {
    portfolio,
    projectDataList
  }
  return result
}

export const sharePortfolio = async (
  portfolio: Portfolio,
  contentDesc: string,
  account: Account,
  branding: Branding,
  email: string
) => {
  const portfolioShare: PortfolioShare = {
    id: generateUid(),
    accountId: account.id,
    title: portfolio.name,
    description: portfolio.description,
    createdAt: Date.now(),
    portfolioId: portfolio.id,
    isViewed: false
  }

  const {
    foregroundColor,
    backgroundColor,
    text: textColor,
    buttonBackgroundColor,
    buttonTextColor
  } = branding.email

  const link = `${domain}/portfolioShare/${portfolioShare.id}`
  const sender = account.name
  const logo = account.settings.watermark || ''

  const emailData: PortfolioShareMailData = {
    link,
    foregroundColor,
    backgroundColor,
    textColor,
    buttonBackgroundColor,
    buttonTextColor,
    sender,
    contentDesc,
    logo
  }

  const emailPayload: Mail = {
    type: 'portfolioShare',
    to: email,
    templateId: template_ids.portfolio_share,
    data: emailData
  }

  await sendMail(emailPayload)

  return updatePortfolioShare(portfolioShare)
}

export const loadPortfolioShareData = async () => {

}

export const getPortfolioShare = async (id: string) => {
  const doc = await firebase
    .firestore()
    .collection('PortfolioShares')
    .doc(id)
    .get()
  return doc.data() as PortfolioShare | undefined
}

export const updatePortfolioShare = async (portfolioShare: PortfolioShare) => {
  return firebase
    .firestore()
    .collection('PortfolioShares')
    .doc(portfolioShare.id)
    .set(portfolioShare)
}
