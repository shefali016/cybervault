import React, { useState } from "react";
import "../App.css";
import firebase from "firebase/app";
import "firebase/auth";
import AppTextField from "../components/AppTextField";
import { Button, Typography } from "@material-ui/core";
import ReactLoading from "react-loading";

const initialState = {
  email: "",
  password: "",
  loading: false
};





export const LoginScreen = (props: any) => {
  const [state, setState] = useState(initialState);
  const { email, password, loading } = state;

  const login = (email: string, password: string, ) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        loggedIn(props);
      });
      
  };

  const loggedIn = (props: any) => {
    props.history.push("/signup");
  }

  const handleInputChange = (key: any) => (e: any) =>
    setState(state => ({ ...state, [key]: e.target.value }));

  const handleLogin = () => {
    setState(state => ({ ...state, loading: true }));
    login(email.trim(), password.trim());
    
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
        style={{ width: "100%", maxWidth: 170 }}
      >
        Login
      </Button>
      <Typography style={{ margin: 20 }} variant={"body1"}>
        OR
      </Typography>
      <Button
        variant="contained"
        onClick={navigateToSignUp}
        color="primary"
        style={{ width: "100%", maxWidth: 170 }}
      >
        Sign up
      </Button>
    </div>
  </div>
  );
};

export default LoginScreen;
