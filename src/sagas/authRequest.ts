import * as Types from '../utils/types';
import firebase from "firebase/app";
import "firebase/auth";

export const authRequest = async (user: Types.User) =>
    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(() => {
            const { currentUser } = firebase.auth();
            let user = {
                name: currentUser?.displayName,
                email: currentUser?.email,
                uid: currentUser?.uid
            }
            return user;
        }).catch((error) => {
            return error;
        })
