import firebase from 'firebase/app'
import { Account, Storage } from 'utils/Interface'
import { getStripeAccount, verifyStripeAccount } from './stripe'

export const getAccount = async (id: string): Promise<Account> => {
  const accountSnapshot = await firebase
    .firestore()
    .collection('Accounts')
    .doc(id)
    .get()

  const account = accountSnapshot.data() as Account

  if (!!account) {
    if (
      account.stripe &&
      typeof account.stripe.accountId === 'string' &&
      !account.stripe.payoutsEnabled
    ) {
      const { account: updatedAccount } = await verifyStripeAccount(account)
      return updatedAccount
    }

    return account
  } else {
    throw Error('Account not found')
  }
}

export const updateAccount = (account: Account): Promise<Account> => {
  return firebase
    .firestore()
    .collection('Accounts')
    .doc(account.id)
    .set(account)
    .then(() => account)
}

export const updateAccountFields = (
  accountId: string,
  accountData: Object | any
): Promise<Account> => {
  return firebase
    .firestore()
    .collection('Accounts')
    .doc(accountId)
    .update(accountData)
    .then(() => accountData)
}

export const listenToStorage = (
  accountId: string,
  onData: (data: Storage | undefined) => void
): (() => void) => {
  return firebase
    .firestore()
    .collection('Storage')
    .doc(accountId)
    .onSnapshot((snapshot) => {
      const storage = snapshot.data() as Storage | undefined

      if (storage) {
        onData(storage)
      }
    })
}
