import firebase from "firebase/app";
import "firebase/auth";
import {SignUpSuccess, SignUpFailure, LoginSuccess, LoginFailure} from "../actions/Auth/index";

export function login(email: string, password: string, ){
  
  console.log("auth.ts");
  
    return (dispatch: any) => {
      console.log("in return");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        let user = firebase.auth().currentUser;
        let activeUser = { id: user?.uid, name: user?.displayName };
        dispatch(LoginSuccess(activeUser));
      }).catch((error) =>{
        dispatch(LoginFailure());
      });
      
  };
}

  export const signUp = (email: string, password: string) =>{
   
    return function(dispatch: any){
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
          dispatch(SignUpSuccess());
      }).catch((error) =>{
        dispatch(SignUpFailure());
      });
  
  }
}