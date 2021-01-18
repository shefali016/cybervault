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
