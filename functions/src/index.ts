import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import * as admin from 'firebase-admin'
import { generateUid } from './utils'
import { Mail } from './utils/interfaces'
import templates from './sendGridTemplates.json'
import config from './config.json'

const sgMail = require('@sendgrid/mail')

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

export const httpsRequests = functions.runWith(runtimeOpts).https.onRequest(app)

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
