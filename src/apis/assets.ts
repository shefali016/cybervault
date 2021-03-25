import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { Asset } from '../utils/Interface'
import AWS, { AWSError, S3 } from 'aws-sdk'

const buildAssetPath = (id: string) => `${id}/${id}-original`

AWS.config.update({
  accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.REACT_APP_AWS_SECURITY_ACCESS_KEY}`,
  region: `${process.env.REACT_APP_AWS_REGION}`
})
var s3 = new AWS.S3()

export const createAsset = async (asset: Asset) => {
  return firebase.firestore().collection('Assets').doc(asset.id).set(asset)
}

export const handleMediaUpload = (id: string, file: any) => {
  var params = {
    Body: file,
    Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`,
    Key: `${id}${file.name}`,
    ACL: 'public-read'
  }
  return s3.upload(params)
}

export const setMedia = (id: string, file: any) => {
  var params = {
    Body: file,
    Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`,
    Key: `${id}${file.name}`,
    ACL: 'public-read'
  }

  return new Promise((resolve, reject) => {
    s3.upload(params).send(
      async (err: AWSError, data: S3.ManagedUpload.SendData) => {
        if (!err) {
          const url = data.Location
          resolve(url)
        } else {
          console.log('Set media failed', err)
          reject(err)
        }
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

export const addAsset = async (accountId: string, asset: Asset) => {
  try {
    return firebase
      .firestore()
      .collection('AccountData')
      .doc(accountId)
      .collection('Assets')
      .doc(asset.id)
      .set(asset)
  } catch (error) {
    console.log('addAsset', error)
    return error
  }
}

export const getAssets = async (
  ids: Array<string>,
  accountId: string
): Promise<Array<Asset>> => {
  const assetRequests = ids.map((id: string) =>
    firebase
      .firestore()
      .collection('AccountData')
      .doc(accountId)
      .collection('Assets')
      .doc(id)
      .get()
      .then((snapshot) => {
        return snapshot.data() as Asset
      })
  )
  return await (await Promise.all(assetRequests)).filter((asset) => !!asset)
}
