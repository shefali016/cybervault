import { User, UserLoginInfo, AuthUser, Account } from '../utils/types'
import firebase from 'firebase/app'
import 'firebase/auth'
import { generateUid } from 'utils'
import { getUser } from 'apis/user'
import { getAccount } from 'apis/account'

export const authRequest = (
  userLogin: UserLoginInfo
): Promise<{ user: User; account: Account }> =>
  firebase
    .auth()
    .signInWithEmailAndPassword(userLogin.email, userLogin.password)
    .then((res: firebase.auth.UserCredential) => {
      console.log(res)
      const { user } = res
      console.log(user)
      if (user && user.uid) {
        return getUser(user.uid)
      } else {
        throw Error('Failed to authenticate user')
      }
    })
    .then((user: User) => {
      const { mainAccount } = user
      return getAccount(mainAccount).then((account) => ({ account, user }))
    })

export const signUpRequest = (
  userLogin: UserLoginInfo
): Promise<{ user: User; account: Account }> =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(userLogin.email, userLogin.password)
    .then((res: firebase.auth.UserCredential) => {
      const { user } = res
      if (user && user.uid && typeof user.email === 'string') {
        const authUser: AuthUser = {
          uid: user.uid,
          email: user.email,
          name: userLogin.name
        }
        return createAccount(authUser)
      } else {
        throw Error('Failed to authenticate user')
      }
    })

export const logoutRequest = () => firebase.auth().signOut()

export const googleLoginRequest = async () => {
  const googleProvider = await new firebase.auth.GoogleAuthProvider()
  const userRes = await firebase.auth().signInWithPopup(googleProvider)
  if (userRes) {
    let userData = {
      name: userRes.user?.displayName,
      email: userRes.user?.email,
      uid: userRes.user?.uid
    }
    return userData
  } else {
    throw Error('Failed to create user')
  }
}

export const createAccount = (
  authUser: AuthUser
): Promise<{ user: User; account: Account }> => {
  const account: Account = {
    id: generateUid(),
    owner: authUser.uid,
    type: 'creator'
  }
  const user: User = {
    id: authUser.uid,
    accounts: [account.id],
    mainAccount: account.id,
    email: authUser.email,
    name: authUser.name
  }

  const firestore = firebase.firestore()

  return firestore
    .collection('Accounts')
    .doc(account.id)
    .set(account)
    .then(() => {
      return firestore.collection('Users').doc(user.id).set(user)
    })
    .then(() => ({ user, account }))
}
