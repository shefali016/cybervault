import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { Project, Account } from '../utils/Interface'
import { GetParams } from 'utils/Interface/api'
import { constructGetDocsApi } from './utils'

/**
 * @deleteProject
 */
export const deleteProject = async (projectId: string, account: Account) => {
  return firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Projects')
    .doc(projectId)
    .delete()
}

/**
 * @createNewProject
 */
export const createNewProjectRequest = async (
  newProjectData: Project,
  account: Account
) => {
  await firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Projects')
    .doc(newProjectData.id)
    .set(newProjectData)
  return newProjectData
}

/**
 * @getAllProjects
 */
export const getAllProjects = async (account: Account) => {
  let allProjectsData: Array<Project> = []
  let data: any = await firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Projects')
    .get()

  for (const doc of data.docs) {
    allProjectsData.push(doc.data())
  }
  return allProjectsData
}

export const getProjects = async (
  account: Account,
  params: Partial<GetParams>
) => {
  let query: any = firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Projects')

  let data: any = await constructGetDocsApi(query, params).get()

  return data.docs.map((doc: any) => doc.data())
}

/**
 * @getSingleProjectDetails
 */
export const getProject = async (
  accountId: string,
  projectId: string | undefined
) => {
  try {
    let data: any = await firebase
      .firestore()
      .collection('AccountData')
      .doc(accountId)
      .collection('Projects')
      .doc(projectId)
      .get()
    return data.data()
  } catch (error) {
    console.log('Error in getProjectDetailsRequest', error)
    return error
  }
}

/**
 * @updateSingleProjectDetails
 */
export const updateProjectDetailsRequest = async (
  account: Account,
  projectData: Object | undefined | any
) => {
  try {
    const data = await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('Projects')
      .doc(projectData.id)
      .set(projectData)
    return data
  } catch (error) {
    console.log('Error in update Project details', error)
    return error
  }
}
