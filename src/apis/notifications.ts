import { Account, CloudNotification } from 'utils/Interface'
import firebase from 'firebase'

const getNotificationCollection = (account: Account) =>
  firebase
    .firestore()
    .collection('AccountData')
    .doc(account.id)
    .collection('Notifications')

export const listenToNotifications = (
  account: Account,
  onData: (notifications: CloudNotification[]) => void
): (() => void) => {
  return getNotificationCollection(account)
    .where('isRead', '!=', true)
    .onSnapshot((snapshot) => {
      const data = snapshot.docs
        ? (snapshot.docs.map((doc) => doc.data()) as CloudNotification[])
        : []
      if (data) {
        onData(data)
      }
    })
}

export const markRead = (account: Account, notification: CloudNotification) => {
  return getNotificationCollection(account).doc(notification.id).delete()
}
