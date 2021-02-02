import firebase from 'firebase/app'
import { Account } from 'utils/Interface'

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

export const updateAccount = (account: Account): Promise<Account> => {
  return firebase
    .firestore()
    .collection('Accounts')
    .doc(account.id)
    .set(account)
    .then(() => account)
}
