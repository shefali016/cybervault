import * as Types from '../utils/types'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

/**
 * @deleteProject
 */
export const deleteProject = async (
  newProjectData: Types.Project,
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
  newProjectData: Types.Project,
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
  let allProjectsData: Array<{}> = []
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
  let allProjectsData: Array<{}> = []
  let data: any = await firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Projects')
    .get()

  for (const doc of data.docs) {
    const projectData = doc.data()
    if (projectData.id === projectId) {
      allProjectsData.push(doc.data())
    }
  }
  return allProjectsData
}

/**
 * @updateSingleProjectDetails
 */
export const updateProjectDetailsRequest = async (
  account: Account,
  projectData: Object | undefined | any
) => {
  let setProjectDetail: Object = {}
  const data = await firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Projects')
    .get()
  for (const doc of data.docs) {
    const project = doc.data()
    if (project.id === projectData.id) {
      setProjectDetail = firebase
        .firestore()
        .collection('AccountData')
        .doc(account.id)
        .collection('Projects')
        .doc(projectData.id)
        .set(projectData)
    }
  }
  return setProjectDetail
}
