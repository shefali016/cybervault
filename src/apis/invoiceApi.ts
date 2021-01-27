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
      .collection('Invoices').doc(`${invoice.id}`).set(invoice)
      
    return invoice
  }
  export const getAllInvoices = async (
    account: Types.Account,
    project: Types.Project,
  ) => {
    let allInvoices: Array<{}> = [];
    let data: any = await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('Projects')
      .doc(project.id)
      .collection('Invoices').get()
    
  for (const doc of data.docs) {
    allInvoices.push(doc.data())
  }
  return allInvoices
  }