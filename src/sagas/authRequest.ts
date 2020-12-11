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

export const signUpRequest = async (user: Types.User) =>
    firebase    
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then( async () => {
            const { currentUser } = firebase.auth();
            let user = {
                name: currentUser?.displayName,
                email: currentUser?.email,
                uid: currentUser?.uid
            }
            return user;
        }).catch((error) =>{
            return error;
        });

export const logoutRequest = async () => 
        firebase
            .auth()
            .signOut()
            .then(() => {
                return true;
            }).catch((error) =>{
                return false;
            });
