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

/**
 * @getAllProjects
 */
export const getAllProjectsRequest = async (
) => {
  return new Promise((resolve, reject) => {
    try {
      firebase
      .firestore()
      .collection('Projects')
      .onSnapshot((QuerySnapshot) => {
        let allProjectsData: Array<{}> = [];
        if (QuerySnapshot && QuerySnapshot.size > 0) {
          QuerySnapshot.forEach(documentSnapshot => {
            const data = {
              projectId: documentSnapshot.id,
              ...documentSnapshot.data(),
            };
            allProjectsData.push(data);
          });
        }
        resolve(allProjectsData);
        })
    } catch (error) {
      reject(error);
    }
  });
}

