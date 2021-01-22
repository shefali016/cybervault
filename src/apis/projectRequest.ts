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
  try {
    let allProjectsData: Array<{}> = []
    let data: any = await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('Projects')
      .doc(projectId)
      .get()
    const project = data.data()
    const imageId: string = project.image
    const videoId: string = project.video
    let imageArray: Object | any = {}
    let videoArray: Object | any = {}
    await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('Assets')
      .where('id', '==', imageId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          imageArray = doc.data()
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })
    await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('Assets')
      .where('id', '==', videoId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          videoArray = doc.data()
        })
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error)
      })

    const projectDetails = {
      ...project,
      image: imageArray.id ? imageArray : { files: [] },
      video: videoArray.id ? videoArray : { files: [] }
    }

    allProjectsData.push(projectDetails)

    return allProjectsData
  } catch (error) {
    console.log('>>>>>>>>>>>>>error', error)
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
    console.log('Errror in update Project details', error)
    return error
  }
}
