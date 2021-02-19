import { User, UserLoginInfo, AuthUser, Account } from '../utils/Interface'
import firebase from 'firebase/app'
import 'firebase/auth'
import { generateUid } from 'utils'
import { getUser } from 'apis/user'
import { getAccount } from 'apis/account'
import {
  SharingPrivacies,
  SubscriptionTypes,
  WatermarkControls,
  WatermarkStyles
} from 'utils/enums'

export const getUserWithAccount = (
  id: string
): Promise<{ user: User; account: Account }> => {
  return getUser(id).then((user: User) => {
    const { mainAccount } = user
    return getAccount(mainAccount).then((account) => ({ account, user }))
  })
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

export const resetPassword=async(password:string)=>{
  var user = firebase.auth().currentUser;
  if(user){
    return user.updatePassword(password).then(function(res) {
      console.log("success")
      return ('Password Changed Successfully')
    }).catch(function(error) {
      console.log(error,"error")
      return error
    });
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
      const user = await getUser(authUser.uid)
      const account = await getAccount(user.mainAccount)
      return { user, account }
    } catch (error) {
      return createAccount(userData)
    }
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
    type: 'creator',
    email: authUser.email,
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
    subscription: { type: SubscriptionTypes.creator },
    settings: {
      sharingPrivacy: SharingPrivacies.strict,
      watermarkStyle: WatermarkStyles.single,
      watermarkControl: WatermarkControls.all
    },
    branding: {
      email: {
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
