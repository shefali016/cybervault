import * as Types from '../utils/types'
import firebase from 'firebase/app'
import 'firebase/auth'

export const authRequest = async (userLogin: Types.UserLoginInfo) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(userLogin.email, userLogin.password)
    .then(() => {
      const { currentUser } = firebase.auth()
      let user = {
        name: currentUser?.displayName,
        email: currentUser?.email,
        uid: currentUser?.uid
      }
      return user
    })
    .catch((error) => {
      return error
    })

export const signUpRequest = async (userLogin: Types.UserLoginInfo) =>
  firebase
    .auth()
    .createUserWithEmailAndPassword(userLogin.email, userLogin.password)
    .then(async () => {
      const { currentUser } = firebase.auth()
      let user = {
        name: currentUser?.displayName,
        email: currentUser?.email,
        uid: currentUser?.uid
      }
      return user
    })
    .catch((error) => {
      return error
    })

export const logoutRequest = async () =>
  firebase
    .auth()
    .signOut()
    .then(() => {
      return true
    })
    .catch((error) => {
      return false
    })

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
    return null
  }
}
