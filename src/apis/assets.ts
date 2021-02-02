import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { Asset, Project, ProjectAsset } from '../utils/Interface'
import { generateUid } from 'utils'

const buildAssetPath = (id: string) => `${id}/${id}-original`

export const createAsset = async (asset: Asset) => {
  return firebase.firestore().collection('Assets').doc(asset.id).set(asset)
}

export const setMedia = (id: string, file: any) => {
  return new Promise((resolve, reject) => {
    const uploadTask = firebase.storage().ref(id).put(file)
    uploadTask.on(
      'state_changed',
      (snapshot: any) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
      },
      () => reject(),
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(function (downloadURL: string) {
            resolve(downloadURL)
          })
      }
    )
  })
}

export const uploadMedia = (id: string, file: any) => {
  const childRef = firebase.storage().ref().child(buildAssetPath(id))
  return childRef.put(file)
}

export const getDownloadUrl = async (id: string) => {
  return new Promise(async function (resolve, reject) {
    const downloadUrl = await firebase
      .storage()
      .ref()
      .child(buildAssetPath(id))
      .getDownloadURL()
    resolve(downloadUrl)
  })
}

export const addProjectAssets = async (
  accountId: string,
  asset: ProjectAsset
) => {
  try {
    return firebase
      .firestore()
      .collection('AccountData')
      .doc(accountId)
      .collection('Assets')
      .doc(asset.id)
      .set(asset)
  } catch (error) {
    console.log('>>>>>>>>>>>Error', error)
    return error
  }
}

export const getAssets = async (
  ids: Array<string>,
  accountId: string
): Promise<Array<ProjectAsset>> => {
  const assetRequests = ids.map((id: string) =>
    firebase
      .firestore()
      .collection('AccountData')
      .doc(accountId)
      .collection('Assets')
      .doc(id)
      .get()
      .then((snapshot) => {
        return snapshot.data() as ProjectAsset
      })
  )
  return await Promise.all(assetRequests)
}
