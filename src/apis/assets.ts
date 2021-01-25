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
  accountData: Account,
  projectData: Project
) => {
  try {
    let assectObject: ProjectAsset = {
      type: '',
      files: [],
      fileName: '',
      id: ''
    }
    let db = firebase.firestore()
    let imagesArray: Array<string> = []
    let videosArray: Array<string> = []
    let ColAssets = await db
      .collection('AccountData')
      .doc(accountData.id)
      .collection('Assets')
    /// Batch Thing //
    let batch = db.batch()

    if (projectData.images && projectData.images.length) {
      for (let index = 0; index < projectData.images.length; index++) {
        const images: ProjectAsset | any = projectData.images[index]
        let id: string
        if (!images.id) {
          id = generateUid()
        } else {
          id = images.id
        }
        imagesArray.push(id)
        let ref = ColAssets.doc(id)
        assectObject = {
          type: 'image',
          files: images.files,
          fileName: images.fileName,
          id: id
        }
        batch.set(ref, {
          ...assectObject,
          createdAt: firebase.firestore.Timestamp.now()
        })
      }
    }
    if (projectData.videos && projectData.videos.length) {
      for (let index = 0; index < projectData.videos.length; index++) {
        const videos: ProjectAsset | any = projectData.videos[index]
        let id: string
        if (!videos.id) {
          id = generateUid()
        } else {
          id = videos.id
        }
        videosArray.push(id)
        let ref = ColAssets.doc(id)
        assectObject = {
          type: 'video',
          files: videos.files,
          fileName: videos.fileName,
          id: id
        }
        batch.set(ref, {
          ...assectObject,
          createdAt: firebase.firestore.Timestamp.now()
        })
      }
    }
    batch.commit()
    const data = {
      imagesArray,
      videosArray
    }
    return data
  } catch (error) {
    console.log('>>>>>>>>>>>Error', error)
    return error
  }
}

export const getAssets = async () => {
  const snapshot = await firebase.firestore().collection('Assets').get()
  return snapshot && snapshot.docs ? snapshot.docs.map((doc) => doc.data()) : []
}
