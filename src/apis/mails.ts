import * as Types from '../utils/Interface'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

export const sendMail = async (mail: Types.Mail) => {
  try {
    await firebase.firestore().collection('Mails').doc().set(mail)
    return mail
  } catch (err) {
    console.log(err)
  }
}

export const allMailTemplates = async () => {
  let mailTemplates: Array<{}> = []
  let data: any = await firebase.firestore().collection('MailTemplates').get()

  for (const doc of data.docs) {
    mailTemplates.push(doc.data())
  }
  return mailTemplates
}
