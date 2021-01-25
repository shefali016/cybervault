import * as Types from '../utils/Interface'
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
  let allProjectsData: Array<Types.Project> = []
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
    let projectsData: Types.Project
    let data: any = await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('Projects')
      .doc(projectId)
      .get()
    const project = data.data()
    const imageIds: Array<string> = project.images
    const videoIds: Array<string> = project.videos
    let imageArray: Array<Types.ProjectAsset> | any = []
    let videoArray: Array<Types.ProjectAsset> | any = []
    if (imageIds && imageIds.length) {
      for (let index = 0; index < imageIds.length; index++) {
        const images = imageIds[index]
        const imageAsset = await firebase
          .firestore()
          .collection('AccountData')
          .doc(account.id)
          .collection('Assets')
          .doc(images)
          .get()
        imageArray.push(imageAsset.data())
      }
    }
    if (videoIds && videoIds.length) {
      for (let index = 0; index < videoIds.length; index++) {
        const videos = videoIds[index]
        const videoAssets = await firebase
          .firestore()
          .collection('AccountData')
          .doc(account.id)
          .collection('Assets')
          .doc(videos)
          .get()
        videoArray.push(videoAssets.data())
      }
    }
    console.log('projectprojectproject', project)

    const projectDetails: Types.Project = {
      ...project,
      images: imageArray && imageArray.length ? imageArray : [],
      videos: videoArray && videoArray.length ? videoArray : []
    }

    projectsData = projectDetails

    return projectsData
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
