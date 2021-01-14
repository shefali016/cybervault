import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'
import { User } from 'utils/types'

export const updateUser = (user: User): Promise<User> => {
  return firebase
    .firestore()
    .collection('Users')
    .doc(user.id)
    .set(user)
    .then(() => user)
}

export const getUser = async (id: string): Promise<User> => {
  return firebase
    .firestore()
    .collection('Users')
    .doc(id)
    .get()
    .then((snapshot) => {
      const data = snapshot.data() as User
      if (data !== undefined) {
        return data
      } else {
        throw Error('Cant find user')
      }
    })
}
