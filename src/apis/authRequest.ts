import {
  User,
  UserLoginInfo,
  AuthUser,
  Account,
  StripeCustomer
} from '../utils/Interface'
import firebase from 'firebase/app'
import 'firebase/auth'
import { generateUid } from 'utils'
import { getUser, updateUser } from 'apis/user'
import { getAccount } from 'apis/account'
import {
  SharingPrivacies,
  WatermarkControls,
  WatermarkStyles
} from 'utils/enums'
import { createStripeCustomer } from './stripe'
import { ErrorRounded } from '@material-ui/icons'

export const getUserWithAccount = async (
  id: string
): Promise<{ user: User; account: Account }> => {
  let user = await getUser(id)

  if (!user) {
    throw Error('user_not_found')
  }

  const { mainAccount } = user
  if (!user.customerId) {
    const customer: StripeCustomer = await createStripeCustomer(user)
    user = { ...user, customerId: customer.id }
    await updateUser(user)
  }
  const account = await getAccount(mainAccount)

  return { account, user }
}

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
        return getUserWithAccount(user.uid)
      } else {
        throw Error('Failed to authenticate user')
      }
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

export const resetPassword = async (
  password: string,
  currentPassword: string
) => {
  var user = firebase.auth().currentUser
  try {
    if (user && user.email) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, currentPassword)
      return user.updatePassword(password)
    } else {
      throw Error()
    }
  } catch (error) {
    throw Error('Failed to change Password')
  }
}

export const googleLoginRequest = async () => {
  const googleProvider = await new firebase.auth.GoogleAuthProvider()
  const { user: authUser } = await firebase
    .auth()
    .signInWithPopup(googleProvider)
  if (authUser) {
    let userData = {
      name: authUser.displayName,
      email: authUser.email,
      uid: authUser.uid
    }
    try {
      const res = await getUserWithAccount(authUser.uid)
      return res
    } catch (error) {
      if (error?.message === 'user_not_found') {
        return createAccount(userData)
      }
      throw error
    }
  } else {
    throw Error('Failed to authenticate google user')
  }
}

export const createAccount = (
  authUser: AuthUser
): Promise<{ user: User; account: Account }> => {
  const account: Account = {
    id: generateUid(),
    owner: authUser.uid,
    type: 'creator',
    email: authUser.email,
    name: '',
    security: {
      twoFactorEnabled: false,
      textMessageVerification: false,
      securityQuestion: { question: '', answer: '' }
    },
    stripe: {
      accountId: null,
      detailsSubmitted: false,
      payoutsEnabled: false
    },
    settings: {
      sharingPrivacy: SharingPrivacies.strict,
      watermarkStyle: WatermarkStyles.single,
      watermarkControl: WatermarkControls.all
    },
    branding: {
      email: {
        foregroundColor: '#fff',
        backgroundColor: '#EFEFEF',
        text: '#000',
        buttonBackgroundColor: '#0f77ff',
        buttonTextColor: '#fff'
      },
      portfolio: {
        backgroundColor: '#999999',
        foregroundColor: '#EFEFEF',
        text: '#000',
        headerGradient1: '#0f77ff',
        headerGradient2: '#fff'
      }
    }
  }
  const user: User = {
    id: authUser.uid,
    accounts: [account.id],
    mainAccount: account.id,
    email: authUser.email,
    name: authUser.name,
    customerId: ''
  }

  const firestore = firebase.firestore()

  return firestore
    .collection('Accounts')
    .doc(account.id)
    .set(account)
    .then(() => {
      return createStripeCustomer(user)
    })
    .then((customer: StripeCustomer) => {
      const updatedUser = { ...user, customerId: customer.id }
      return firestore
        .collection('Users')
        .doc(user.id)
        .set(updatedUser)
        .then(() => ({ user: updatedUser, account }))
    })
}
