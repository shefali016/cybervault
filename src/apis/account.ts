import firebase from 'firebase/app'
import { Account } from 'utils/types'

export const getAccount = (id: string): Promise<Account> => {
  return firebase
    .firestore()
    .collection('Accounts')
    .doc(id)
    .get()
    .then((snapshot) => {
      const account = snapshot.data() as Account
      if (account !== undefined) {
        return account
      } else {
        throw Error('Account not found')
      }
    })
}
