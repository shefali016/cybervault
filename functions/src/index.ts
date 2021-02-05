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

export const emailMessage=(req:any,res:any)=>{
  const { email,message } = req.body;
  return corsHandler(req, res, () => {
    var text = `<div>
      <h4>Information</h4>
      <ul>
        <li>
          Name - ${ "cybervault"}
        </li>
        <li>
          Email - ${email || ""}
        </li>
        <li>
          Phone - ${"cybervault"}
        </li>
      </ul>
      <h4>Message</h4>
      <p>${message || ""}</p>
    </div>`;
    const msg = {
      to: "cybervault@mailinator.com",
      from: "cybervault@mailinator.com",
      subject: `${"cybervault"} sent you a new message`,
      text: text,
      html: text
    };
    sgMail.setApiKey(
      "SENDGRID API KEY"
    );
    sgMail.send(msg);
    res.status(200).send("success");
  })
}

export const httpsRequests = functions.https.onRequest(app)
app.use('/api/v1/sendEmail',emailMessage)



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