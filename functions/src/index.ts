import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import * as admin from 'firebase-admin'
import { generateUid } from './utils'
import { Mail } from './utils/interfaces'
import templates from './sendGridTemplates.json'
import config from './config.json'
import axios from 'axios'
var ffmpeg = require('fluent-ffmpeg');

const fs = require('fs')
const sgMail = require('@sendgrid/mail')
var path=require('path')

// const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount

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

const rootPath=path.join('./tmp/test.mp4')
functions.logger.log(rootPath,"rooooooooooooooooooooooooooo")


const getFileMetaData = async (url: string) => {

  return new Promise(async (resolve, reject) => {
    try {
      functions.logger.log("datatttttttttttttttttttttt")

      let data = await axios.get(`${url}`)
      // var dir = './tmp'
      // if (!fs.existsSync(dir)) {
      //   fs.mkdirSync(dir)
      // }
      const rootPath=path.join(`../tmp/test.webm`)
      console.log(rootPath,"pathhhhhhhhhhhhhhhhhhhhhhh")
      fs.writeFile(rootPath, data.data, async(err: any) =>{
        console.log(err,"rrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        if(err){
          reject(err)
        }
        let video = getDetails()
        console.log(video, '777777777777777777777777777777777777777777777')
        resolve(video)
      })
    } catch (err) {
      console.log(err,"errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
      reject(err)
    }
  })
}
const getDetails = () => {
  try {
    ffmpeg.ffprobe(`../tmp/test.webm`,function(err:any, metadata:any) {
      console.log(metadata,"metttttttttttttttttttt")
      console.log(err,"ffffffffffffffffffffffffffffffffffffff")
      return metadata
    });
    // var process = await new ffmpeg(`../tmp/test.webm`)
    // console.log(process,"processssssssssssssssssssssssssss")
  } catch (e) {
    console.log(e.code,"codeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    console.log(e.msg,"msssssssssssssssssssssssssssssssssssss")
    return e
  }
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
  .onWrite(async (change, context) => {
    try {
      let newData = change.after.data()
      let oldData = change.before.data()
      let accId = context.params.accountId
      let assetId = context.params.accountId

      if (
        !oldData &&
        newData &&
        newData &&
        newData?.files?.length &&
        newData?.type === 'video'
      ) {
       
        const originalFileData = newData.files.find((file: any, i: number) => {
          return file.original
        })
        const videoMetaData: any = await getFileMetaData(originalFileData.url)
        console.log(videoMetaData,assetId,"nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
        originalFileData.codec =
          videoMetaData

        const filesData: any = newData.files.map((file: any, i: number) => {
          if (file.id === originalFileData.id) {
            return originalFileData
          } else {
            return file
          }
        })

        console.log(
          filesData,
          originalFileData,
          '0000000000000000000000000000000'
        )

        admin
          .firestore()
          .collection('AccountData')
          .doc(accId)
          .collection('Assets')
          .doc(assetId)
          .update({
            files: filesData
          })
      }
    } catch (error) {
      console.log('add codec ', error)
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
