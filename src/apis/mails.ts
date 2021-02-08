import * as Types from '../utils/Interface'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'


export const sendMail = async (
    mail:any
  ) => {
      console.log('kkkkkkkkkkkkkk')
    await firebase
      .firestore()
      .collection('Mails')
      .doc(`${mail.id}`).set(mail)
  }
 