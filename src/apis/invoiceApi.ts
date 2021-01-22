import * as Types from '../utils/types'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'


export const newInvoice = async (
    account: Types.Account,
    project: Types.Project,
    invoice:Types.Invoice
  ) => {
    await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('Projects')
      .doc(project.id)
      .collection('invoices').doc(`${invoice.id}`).set(invoice)
      
    return invoice
  }