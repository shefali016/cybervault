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
  return new Promise((resolve, reject) => {
    firebase
    .firestore()
    .collection('Projects')
    .doc(newProjectData.id)
    .set(newProjectData)
    .then(() => {
      resolve (newProjectData);
    })
    .catch((error) => {
      reject (error);
    })
  });
   
}

