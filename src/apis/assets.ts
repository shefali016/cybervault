import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { Asset } from '../utils/Interface'
import axios from 'axios';

const buildAssetPath = (id: string) => `${id}/${id}-original`
var AWS = require('aws-sdk')
AWS.config.update({
  cloudwatchevents: '2015-10-07',
  accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.REACT_APP_AWS_SECURITY_ACCESS_KEY}`,
  region: `${process.env.REACT_APP_AWS_REGION}`
})
var s3 = new AWS.S3()
var cloudwatchevents = new AWS.CloudWatchEvents();


const { server_url, domain } = require('../config.json')

export const convertMedia = (data: any) => {
  return new Promise(function async (resolve, reject) {
    // var params = {
    //   Name: 'arn:aws:iam::460614553226:role/service-role/MediaConvert_Default_Role'
    // };
    // cloudwatchevents.describeEventBus(params, function(err:any, data:any) {
    //   if (err) console.log(err, err.stack,"cloudwatchhhh"); // an error occurred
    //   else     console.log(data,"cloudwatchhhhdata");           // successful response
    // });
    axios.post<any>(
      `${server_url}/api/v1/media/convert`,
      {data:data}
    ).then((res)=>{
      resolve(res)
    }).catch((err)=>{
        reject(err)
    })
  })
}


export const createAsset = async (asset: Asset) => {
  return firebase.firestore().collection('Assets').doc(asset.id).set(asset)
}

export const setMedia = (id: string, file: any) => {
  const name = file.name.replace(/ /g, '')
  var params = {
    Body: file,
    Bucket: `${process.env.REACT_APP_AWS_BUCKET_NAME}`,
    Key: `${id}${name}`,
    ACL: 'public-read'
  }
  return s3.upload(params)
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

export const getSingleAsset = async (
  id: string,
  accountId: string
)=> {
  const assetRequest = 
    await firebase
      .firestore()
      .collection('AccountData')
      .doc(accountId)
      .collection('Assets')
      .doc(id)
      .get()
      return assetRequest.data() as Asset
}
