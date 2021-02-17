import * as Types from '../utils/Interface'
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
      .collection('Invoices').doc(`${invoice.id}`).set(invoice)
      
    return invoice
  }
  export const getAllInvoices = async (
    account: Types.Account,
  ) => {
    let allInvoices: Array<{}> = [];
    let data: any = await firebase
      .firestore()
      .collection('AccountData')
      .doc(account.id)
      .collection('Invoices').get()
    
  for (const doc of data.docs) {
    allInvoices.push(doc.data())
  }
  return allInvoices
  }

  export const getInvoice = async (
    accountId:string,
    invoiceId:string
  ) => {
    let data: any = await firebase
      .firestore()
      .collection('AccountData')
      .doc(accountId)
      .collection('Invoices').doc(`${invoiceId}`).get()
  return data.data()
  }

  export const sendRevisionRequest = async (
    accountId: string,
    invoiceId:string,
    conversation:Types.userConversation
  ) => {
 await firebase
      .firestore()
      .collection('AccountData')
      .doc(accountId)
      .collection('Invoices').doc(`${invoiceId}`)
      .collection('Conversations').doc(`${conversation.id}`).set(conversation)
  }

  export const allInvoiceConversation = async (
    accountId:string,
    invoiceId:string,
  ) => {
    let invoiceConversation: Array<{}> = [];
    let data: any =await firebase
      .firestore()
      .collection('AccountData')
      .doc(accountId)
      .collection('Invoices').doc(`${invoiceId}`)
      .collection('Conversations').get()

      for (const doc of data.docs) {
        invoiceConversation.push(doc.data())
      }
      return invoiceConversation
  }

