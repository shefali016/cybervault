import * as Types from '../utils/Interface'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

/**
 * @getClients
 */
export const getClients = async (
  account: Types.Account,
) => {
  let clientsData: Array<{}> = []
  let data: any = await firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Clients')
    .get()

  for (const doc of data.docs) {
    clientsData.push(doc.data())
  }
  return clientsData
}

/**
 * @updateClientDetails
 */
export const addClient = async (
  account: Types.Account,
  client:Types.Client
) => {
  try{
    await firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Clients').doc(client.id).set(client)
    return client
  }
  catch(error){
    return {message:'Failed to add Client'}
  }
}
