import * as Types from '../utils/types'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

/**
 * @createNewProject
 */
export const createNewProjectRequest = async (
  newProjectData: Types.Project
) => {
  await firebase
    .firestore()
    .collection('Projects')
    .doc(newProjectData.id)
    .set(newProjectData)
    .then(() => {
      return newProjectData
    })
    .catch((error) => {
      return error
    })
}
