import React, { useState, useEffect } from "react";
import "../App.css";
import { connect } from 'react-redux';
import { login } from "../actions/authActions";
import AppTextField from "../components/AppTextField";
import { Button, Typography } from "@material-ui/core";
import ReactLoading from "react-loading";
import * as Types from '../utils/types';
import googleIcon from '../assets/googleSignInButton.png';
import firebase from "firebase/app";
import "firebase/auth";

const initialState = {
  email: "",
  password: "",
  loading: false
};

function googleSignIn(){
  const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithPopup(googleProvider).then((res: any) => {
    console.log(res.user);
  }).catch((error: any) => {
    console.log(error.message)
  });
}

export const LoginScreen = (props: any) => {
  const [state, setState] = useState(initialState);
  const { email, password, loading } = state;

  useEffect(()=>{
    if(props.isLoggedIn && props.user)
    { 
      loggedIn(props);
    }
  },[props.isLoggedIn, props.user]);
 

  const loggedIn = (props: any) => {
    setState(state => ({ ...state, loading: false }));
    props.history.push("/home");
  }

  const handleInputChange = (key: any) => (e: any) =>
    setState(state => ({ ...state, [key]: e.target.value }));

  const handleLogin = () => {
    setState(state => ({ ...state, loading: true }));
    props.auth({email: email.trim(), password: password.trim()});
  };

  const navigateToSignUp = () => {
    props.history.push("/signup");
  };

  return (
  <div className= "background">
    <div className={"container center-content"}>
      <Typography variant={"h4"} style={{ fontWeight: "bold", margin: 20 }}>
        Welcome
      </Typography>
      <form className={"col"}>
        <AppTextField
          label="Email"
          variant="filled"
          onChange={handleInputChange("email")}
          style={{ marginBottom: 10 }}
        />
        <AppTextField
          label="Password"
          variant="filled"
          onChange={handleInputChange("password")}
          type={"password"}
        />
      </form>
      <ReactLoading type={loading ? "bubbles" : "blank"} color={"#fff"} />
      <Button
        variant="contained"
        onClick={handleLogin}
        color="primary"
        style={{ width: "100%", maxWidth: 185 }}
      >
        Login
      </Button>
        <Button className="login-provider-button" variant="contained"
        style={{ width: "100%", maxWidth: 185, maxHeight:40,marginTop:10, borderRadius:0.8 }}
        onClick={googleSignIn}>
        <img src={googleIcon} alt="google icon"/>
       </Button>
   
      <Typography style={{ margin: 20 }} variant={"body1"}>
        OR
      </Typography>
      <Button
        variant="contained"
        onClick={navigateToSignUp}
        color="primary"
        style={{ width: "100%", maxWidth: 185 }}
      >
        Sign up
      </Button>
    </div>
  </div>
  );
};

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user
})

const mapDispatchToProps = (dispatch: any) => ({
  auth: (user: Types.User) => {
    return dispatch(login(user));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen)
