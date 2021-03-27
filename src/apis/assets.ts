import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { Asset } from '../utils/Interface'
import axios from 'axios'
import AWS, { AWSError, S3 } from 'aws-sdk'

const buildAssetPath = (id: string) => `${id}/${id}-original`

AWS.config.update({
  accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.REACT_APP_AWS_SECURITY_ACCESS_KEY}`,
  region: `${process.env.REACT_APP_AWS_REGION}`
})
var s3 = new AWS.S3()

const { server_url } = require('../config.json')

export const convertMedia = (data: any) => {
  return new Promise(function async(resolve, reject) {
    axios
      .post<any>(`${server_url}/api/v1/media/convert`, { data: data })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const createAsset = async (asset: Asset) => {
  return firebase.firestore().collection('Assets').doc(asset.id).set(asset)
}

export const handleMediaUpload = (id: string, file: any) => {
  var params = {
    Body: file,
    Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`,
    Key: id,
    ACL: 'public-read'
  }
  return s3.upload(params)
}

export const setMedia = (id: string, file: any) => {
  var params = {
    Body: file,
    Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`,
    Key: `${id}-${file.name}`,
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
        return snapshot.data() as Asset | null
      })
  )

  const assets = await Promise.all(assetRequests)

  return assets.filter((asset: Asset | null) => !!asset) as Asset[]
}

export const getAllAssets = async (accountId: string) => {
  let assetList: Array<Asset> = []
  const assetData: any = await firebase
    .firestore()
    .collection('AccountData')
    .doc(accountId)
    .collection('Assets')
    .get()
  for (const doc of assetData.docs) {
    const assetObject = doc.data()
    assetList.push(assetObject)
  }
  return assetList
}

export const deleteAsset = async (accountId: string, assetId: string) => {
  try {
    return firebase
      .firestore()
      .collection('AccountData')
      .doc(accountId)
      .collection('Assets')
      .doc(assetId)
      .delete()
  } catch (error) {
    console.log('delete Asset', error)
    return error
  }
}

export const getSingleAsset = async (id: string, accountId: string) => {
  const assetRequest = await firebase
    .firestore()
    .collection('AccountData')
    .doc(accountId)
    .collection('Assets')
    .doc(id)
    .get()
  return assetRequest.data() as Asset
}
