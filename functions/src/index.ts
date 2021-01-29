import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import * as admin from 'firebase-admin';
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
  databaseURL: 'https://cybervault-8cfe9.firebaseio.com'
});

export const httpsRequests = functions.https.onRequest(app)

export const myFunction = functions.firestore
  .document(`AccountData/{accountId}/Invoices/{invoiceId}`)
  .onWrite((change, context) => {
      try {
        let accId=context.params.accountId;
        let newData = change.after.data()
        let oldData = change.before.data()
          if (newData && Object.keys(newData).length && (!oldData || (oldData && !oldData.length))){
          let projectId = newData.projectId
          admin.firestore()
        .collection('AccountData')
        .doc(accId)
        .collection('Projects').doc(projectId).update({
            canInvoice:false
        })
        }
      } catch (error) {
        console.log(error, "error occurs");
        
      }
   });