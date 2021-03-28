import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import * as admin from 'firebase-admin'
import { generateUid } from './utils'
import { Asset, AssetFile, Mail } from './utils/interfaces'
import templates from './sendGridTemplates.json'
import config from './config.json'
import axios from 'axios'
import os from 'os'
var ffmpeg = require('fluent-ffmpeg')

const fs = require('fs')
const sgMail = require('@sendgrid/mail')
var path = require('path')

const app = express()

export const corsHandler = cors({ origin: true })

app.use(corsHandler)

// Routes
const stripeRoute = require('./routes/stripe')
const mediaConvert = require('./routes/mediaConvert')
app.use('/api/v1/stripe', stripeRoute)
app.use('/api/v1/media', mediaConvert)

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://cybervault-8cfe9.firebaseio.com'
})

const runtimeOpts = {
  timeoutSeconds: 300
}

const getFileMetaData = async (url: string) => {
  return new Promise(async (resolve, reject) => {
    const rootPath = `${os.tmpdir()}/${url}`

    const unlinkFile = () => fs.unlink(rootPath)

    try {
      let data = await axios.get(`${url}`)

      fs.writeFile(rootPath, data.data, async (err: any) => {
        if (err) {
          reject(err)
        }
        let details = await getDetails(rootPath)
        unlinkFile()
        resolve(details)
      })
    } catch (err) {
      unlinkFile()
      reject(err)
    }
  })
}

const getDetails = (path: string) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(path, (err: any, metadata: any) => {
      if (!err) {
        resolve(metadata)
      } else {
        reject(err)
      }
    })
  })
}

export const httpsRequests = functions.runWith(runtimeOpts).https.onRequest(app)

export const myFunction = functions.firestore
  .document(`AccountData/{accountId}/Invoices/{invoiceId}`)
  .onWrite((change, context) => {
    try {
      let accId = context.params.accountId
      let newData = change.after.data()
      let oldData = change.before.data()

      if (
        (!oldData && newData) ||
        (oldData && newData && oldData.isPaid && !newData.isPaid)
      ) {
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
        (oldData && !newData) ||
        (oldData && newData && !oldData.isPaid && newData.isPaid)
      ) {
        let projectId = oldData.projectId
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

export const sendEmail = functions.firestore
  .document(`Mails/{mailId}`)
  .onWrite((change, context) => {
    try {
      let newData = change.after.data()
      let oldData = change.before.data()
      if (!oldData && newData && newData.to && newData.templateId) {
        const msg = {
          to: newData.to,
          from: functions.config().from_email.key,
          templateId: newData.templateId,
          dynamic_template_data: newData.data
        }
        sgMail.setApiKey(`${functions.config().sendgrid.key}`)
        return sgMail.send(msg)
      }
    } catch (error) {
      console.log('sendEmail error', error)
    }
  })

export const addCodec = functions.firestore
  .document(`AccountData/{accountId}/Assets/{assetId}`)
  .onCreate(async (snapshot, context) => {
    try {
      let asset = snapshot.data() as Asset | undefined
      let accId = context.params.accountId
      let assetId = context.params.accountId

      if (asset && asset.files && asset.type === 'video') {
        const originalFile = asset.files.find(
          (file: AssetFile) => file.original
        )

        if (!originalFile) {
          throw Error('Missing original file')
        }

        const videoMetaData: any = await getFileMetaData(originalFile.url)
        console.log('Video meta data', videoMetaData, assetId)

        const newAsset = {
          ...asset,
          files: asset.files.map((file: AssetFile) =>
            file.original ? { ...file, codec: videoMetaData } : file
          )
        }

        console.log('New asset', newAsset)

        return admin
          .firestore()
          .collection('AccountData')
          .doc(accId)
          .collection('Assets')
          .doc(assetId)
          .set(newAsset)
      }

      return true
    } catch (error) {
      console.log('add codec error', error)
      return false
    }
  })

export const handlePortfolioShareViewed = functions.firestore
  .document(`PortfolioShares/{id}`)
  .onWrite((change) => {
    try {
      let newShare = change.after.data()
      let oldShare = change.before.data()
      if (oldShare && newShare && !oldShare.isViewed && newShare.isViewed) {
        const id = generateUid()
        const notification = {
          id,
          type: 'portfolioViewed',
          createdAt: Date.now(),
          title: `Your ${newShare.title} portfolio has been viewed.`,
          isRead: false
        }
        return admin
          .firestore()
          .collection('AccountData')
          .doc(newShare.accountId)
          .collection('Notifications')
          .doc(id)
          .set(notification)
      }
      return true
    } catch (error) {
      console.log(error, 'error occurs')
      return false
    }
  })

export const handleNotificationCreated = functions.firestore
  .document(`AccountData/{accountId}/Notifications/{id}`)
  .onCreate(async (snapshot, context) => {
    try {
      let notification = snapshot.data()
      const { accountId } = context.params

      if (notification) {
        const accountSnapshot = await admin
          .firestore()
          .collection('Accounts')
          .doc(accountId)
          .get()
        const account = accountSnapshot.data()

        if (!account) {
          return false
        }

        const accountOwnerSnapshot = await admin
          .firestore()
          .collection('Users')
          .doc(account.owner)
          .get()
        const accountOwner = accountOwnerSnapshot.data()

        if (!accountOwner) {
          return false
        }

        const { title } = notification

        const to = accountOwner.email

        const mail: Mail = {
          to,
          data: {
            title,
            link: `${config.domain}/dashboard`,
            logo: `${config.domain}/logo.png`
          },
          type: 'notification',
          templateId: templates.notification
        }

        return admin.firestore().collection('Mails').doc().set(mail)
      }
      return true
    } catch (error) {
      console.log(error, 'error occurs')
      return false
    }
  })

export const updateUsedStorage = functions.firestore
  .document(`AccountData/{accountId}/Assets/{id}`)
  .onWrite(async (change, context) => {
    try {
      let accId: string = context.params.accountId

      let assetAfter = change.after.data()
      let assetBefore = change.before.data()

      let sizeAfter: number = 0
      let sizeBefore: number = 0

      if (assetAfter) {
        sizeAfter = assetAfter.files.reduce(
          (total: number, file: AssetFile) => {
            return total + file.size
          },
          0
        )
      }

      if (assetBefore) {
        sizeBefore = assetBefore.files.reduce(
          (total: number, file: AssetFile) => {
            return total + file.size
          },
          0
        )
      }

      const currentUsedStorage: any = await admin
        .firestore()
        .collection('Storage')
        .doc(accId)
        .get()
      const storageData = currentUsedStorage.data()
      const usedStorage =
        storageData && storageData.usedStorage ? storageData.usedStorage : 0

      const totalStorageUsed = usedStorage + (sizeAfter - sizeBefore)

      const data = {
        usedStorage: totalStorageUsed
      }
      return admin.firestore().collection('Storage').doc(accId).set(data)
    } catch (error) {
      console.log(error, 'error occurs')
      return false
    }
  })
