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
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('Projects')
      .doc(newProjectData.id)
      .set(newProjectData)
      .then(() => {
        resolve(newProjectData)
      })
  })
}

/**
 * @getAllProjects
 */
export const getAllProjectsRequest = async (account: Account) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('Projects')
      .onSnapshot((QuerySnapshot) => {
        let allProjectsData: Array<{}> = []
        if (QuerySnapshot && QuerySnapshot.size > 0) {
          QuerySnapshot.forEach((documentSnapshot) => {
            const data = {
              projectId: documentSnapshot.id,
              ...documentSnapshot.data()
            }
            allProjectsData.push(data)
          })
        }
        resolve(allProjectsData)
      })
  })
}

/**
 * @getSingleProjectDetails
 */
export const getProjectDetailsRequest = async (
  account: Account,
  projectId: string | undefined
) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('AllProjects')
      .doc(account.id)
      .collection('Projects')
      .onSnapshot((QuerySnapshot) => {
        let allProjectsData: Array<{}> = []
        if (QuerySnapshot && QuerySnapshot.size > 0) {
          QuerySnapshot.forEach((documentSnapshot) => {
            const data = {
              projectId: documentSnapshot.id,
              ...documentSnapshot.data()
            }
            if (data.projectId === projectId) {
              allProjectsData.push(data)
            }
          })
        }
        resolve(allProjectsData)
      })
  })
}

/**
 * @updateSingleProjectDetails
 */
export const updateProjectDetailsRequest = async (
  account: Account,
  projectData: Object | undefined | any
) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection('AllProjects')
      .doc(account.id)
      .collection('Projects')
      .onSnapshot((QuerySnapshot) => {
        let setProjectDetail: Object = {}
        if (QuerySnapshot && QuerySnapshot.size > 0) {
          QuerySnapshot.forEach((documentSnapshot) => {
            const data = {
              projectId: documentSnapshot.id,
              ...documentSnapshot.data()
            }
            if (data.projectId === projectData.projectId) {
              setProjectDetail = firebase
                .firestore()
                .collection('AllProjects')
                .doc(account.id)
                .collection('Projects')
                .doc(data.projectId)
                .set(projectData)
            }
          })
        }
        resolve(setProjectDetail)
      })
  })
}
