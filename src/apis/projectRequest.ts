import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { ProjectAsset, Project } from '../utils/Interface'

/**
 * @deleteProject
 */
export const deleteProject = async (
  newProjectData: Project,
  account: Account
) => {
  return firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Projects')
    .doc(newProjectData.id)
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
export const getAllProjectsRequest = async (account: Account) => {
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

/**
 * @getSingleProjectDetails
 */
export const getProjectDetailsRequest = async (
  account: Account,
  projectId: string | undefined
) => {
  try {
    let data: any = await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
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
