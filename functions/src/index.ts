import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import * as admin from 'firebase-admin'
import firebase from 'firebase'
import 'firebase/storage'
import 'firebase/firestore'
import axios from 'axios'

const config = {
  apiKey: 'AIzaSyA0BdrojB50-mTWwLdK4udDSiZP8vpQHjw',
  authDomain: 'cybervault-8cfe9.firebaseapp.com',
  databaseURL: 'https://cybervault-8cfe9.firebaseio.com',
  projectId: 'cybervault-8cfe9',
  storageBucket: 'cybervault-8cfe9.appspot.com',
  messagingSenderId: '33561487991',
  appId: '1:33561487991:web:a2b2f3c7edd1f75cf5f472',
  measurementId: 'G-HL31DXGLWC'
}

firebase.initializeApp(config)

// import firebaseAccountCredentials from "./cybervault-8cfe9-firebase-adminsdk-kpppk-d07b59a821.json";

// const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount

const app = express()

export const corsHandler = cors({ origin: true })

app.use(corsHandler)

// Routes
const stripeRoute = require('./routes/stripe')
app.use('/api/v1/stripe', stripeRoute)

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://cybervault-8cfe9.firebaseio.com',
  storageBucket:'cybervault-8cfe9.appspot.com'
})

export const httpsRequests = functions.https.onRequest(app)

export const myFunction = functions.firestore
  .document(`AccountData/{accountId}/Invoices/{invoiceId}`)
  .onWrite((change, context) => {
    try {
      let accId = context.params.accountId
      let newData = change.after.data()
      let oldData = change.before.data()

      if (newData && Object.keys(newData).length && !oldData) {
        let projectId = newData.projectId
        admin
          .firestore()
          .collection('AccountData')
          .doc(accId)
          .collection('Projects')
          .doc(projectId)
          .update({
            canInvoice: false
          })
      } else if (
        newData &&
        Object.keys(newData).length &&
        newData.isPaid &&
        oldData &&
        Object.keys(oldData).length &&
        !oldData.isPaid
      ) {
        let projectId = newData.projectId
        admin
          .firestore()
          .collection('AccountData')
          .doc(accId)
          .collection('Projects')
          .doc(projectId)
          .update({
            canInvoice: true
          })
      }
    } catch (error) {
      console.log(error, 'error occurs')
    }
  })

export const resizeVideo = () => {
  console.log('resize')
}

export const checkVideoSize = functions.firestore
  .document(`AccountData/{accId}/Assets/{assetId}`)
  .onWrite((change, context) => {
    try {
      let newData = change.after.data()
      let oldData = change.before.data()
      console.log(
        '-------------------------------here-----------------------------'
      )
      console.log(newData, oldData, newData?.files[0], 'newwwwdatattaattttt')
      if (!oldData && newData?.files?.length && newData.files[0].url && newData.path) {
        let bucket=admin.storage().bucket()
        console.log(newData.path,"rrrrrrrrrrrrrrrrrrrrrrrrrrrrbbbbbbbb")
        let file=bucket.file(`${newData.path}`)
        file.getMetadata().then((res)=>{
            console.log(res[0].size,"resssssssssssssssssssssssssss")
            if (res[0].size > 2000) {
                    resizeVideo()
                  }
        })
        // const url = firebase.storage().refFromURL(newData.files[0].url)
        // console.log(newData.files[0], 'pppppppppppppppppppppppp')
        // url
        //   .getMetadata()
        //   .then((res) => {
        //     console.log(res.size, 'ressssssssssssssssssssssssssssssss')
        //     if (res.size > 2000) {
        //       resizeVideo(res)
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err, 'error occurs')
        //   })
      }
    } catch (error) {
      console.log(error, 'error occurs')
    }
  })
