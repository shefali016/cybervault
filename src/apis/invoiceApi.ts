import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import {
  Invoice,
  Account,
  Project,
  InvoiceShare,
  InvoiceConversation
} from '../utils/Interface'

export const getInvoiceShare = async (shareId: string) => {
  const doc = await firebase
    .firestore()
    .collection('InvoiceShares')
    .doc(shareId)
    .get()

  const invoiceShare = doc.data() as InvoiceShare | undefined

  if (invoiceShare) {
    await firebase
      .firestore()
      .collection('InvoiceShares')
      .doc(shareId)
      .update({ isViewed: true })
  }

  return invoiceShare
}

export const newInvoice = async (
  account: Account,
  project: Project,
  invoice: Invoice,
  invoiceShare: InvoiceShare
): Promise<Invoice> => {
  await firebase
    .firestore()
    .collection('InvoiceShares')
    .doc(invoiceShare.id)
    .set(invoiceShare)

  await firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Invoices')
    .doc(`${invoice.id}`)
    .set(invoice)

  return invoice
}
export const getAllInvoices = async (account: Account) => {
  let allInvoices: Array<{}> = []
  let data: any = await firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Invoices')
    .get()

  for (const doc of data.docs) {
    allInvoices.push(doc.data())
  }
  return allInvoices
}

export const getInvoice = async (accountId: string, invoiceId: string) => {
  let data: any = await firebase
    .firestore()
    .collection('AccountData')
    .doc(accountId)
    .collection('Invoices')
    .doc(`${invoiceId}`)
    .get()
  const invoice: Invoice | undefined = data.data()
  if (!invoice) {
    throw Error('missing data')
  }
  return invoice
}

export const sendRevisionRequest = async (
  accountId: string,
  invoiceId: string,
  conversation: InvoiceConversation
) => {
  await firebase
    .firestore()
    .collection('AccountData')
    .doc(accountId)
    .collection('Invoices')
    .doc(`${invoiceId}`)
    .collection('Conversations')
    .doc(`${conversation.id}`)
    .set(conversation)
}

export const allInvoiceConversation = async (
  accountId: string,
  invoiceId: string
) => {
  let invoiceConversation: Array<{}> = []
  let data: any = await firebase
    .firestore()
    .collection('AccountData')
    .doc(accountId)
    .collection('Invoices')
    .doc(`${invoiceId}`)
    .collection('Conversations')
    .get()

  for (const doc of data.docs) {
    invoiceConversation.push(doc.data())
  }
  return invoiceConversation
}

export const updateInvoice = async (
  accountId: any,
  invoiceId: string,
  invoiceData: any
) => {
  await firebase
    .firestore()
    .collection('AccountData')
    .doc(accountId)
    .collection('Invoices')
    .doc(`${invoiceId}`)
    .update(invoiceData)
  return invoiceData
}

export const deleteInvoice = async (account: Account, invoice: Invoice) => {
  const res = await firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Invoices')
    .doc(invoice.id)
    .delete()
  console.log('DELETED', account, invoice)
  return res
}
