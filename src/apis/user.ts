import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { User } from 'utils/types'

export const updateUser = async (user: User) => {
  return firebase
    .firestore()
    .collection('User')
    .doc(user.id)
    .set(user)
    .then(() => user)
}
