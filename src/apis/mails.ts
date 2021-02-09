import * as Types from '../utils/Interface'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'


export const sendMail = async (
    mail:any
  ) => {
    await firebase
      .firestore()
      .collection('Mails')
      .doc(mail.id).set(mail)
  }

export const allMailTemplates=async()=>{
  let mailTemplates: Array<{}> = []
  let data: any = await firebase
    .firestore()
    .collection('MailTemplates').get()

  for (const doc of data.docs) {
    mailTemplates.push(doc.data())
  }
  console.log(mailTemplates,"bbbbbbbbbbbbbbbbbbbggggggggggggggggggg")
  return mailTemplates
}
 