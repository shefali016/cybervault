import * as functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import * as admin from 'firebase-admin';
const sgMail = require("@sendgrid/mail");

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

          if (newData && Object.keys(newData).length && (!oldData)){
            let projectId = newData.projectId
          admin.firestore()
        .collection('AccountData')
        .doc(accId)
        .collection('Projects').doc(projectId).update({
            canInvoice:false
        })
        }
        else if(newData && Object.keys(newData).length && newData.isPaid && oldData && Object.keys(oldData).length && !oldData.isPaid){
          let projectId = newData.projectId
          admin.firestore()
          .collection('AccountData')
          .doc(accId)
          .collection('Projects').doc(projectId).update({
              canInvoice:true
          })
        }
      } catch (error) {
        console.log(error, "error occurs");
        
      }
   });

export const sendEmail = functions.firestore
.document(`Mails/{mailId}`)
.onWrite((change, context) => {
    try {
      let newData = change.after.data()
      let oldData = change.before.data()
      if(!oldData && newData?.to && newData?.templateId ){
        const msg = {
          to: newData.to,
          from:functions.config().from_email.key,
          templateId:newData.templateId,
          dynamic_template_data:newData.data
        }
        sgMail.setApiKey(
                  `${functions.config().sendgrid.key}`
                );
                sgMail.send(msg).then((res:any)=>{
                    console.log('success')
                }).catch((error:any)=>{
                  console.log(error,"error Occurs")
                })      
      }
      
    } catch (error) {
      console.log(error, "error occurs");
      
    }
 });

