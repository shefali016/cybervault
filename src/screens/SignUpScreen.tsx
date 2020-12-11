import React, { useState } from "react";
import "../App.css";
import AppTextField from "../components/AppTextField";
import { Button, Typography } from "@material-ui/core";
// import { signUp } from "../firebase/auth";
import ReactLoading from "react-loading";

const initialState = {
  email: "",
  password: "",
  passwordConfirm: "",
  loading: false
};

export const SignUpScreen = (props: any) => {
  const [state, setState] = useState(initialState);
  const { email, password, passwordConfirm, loading } = state;

  const handleInputChange = (key: any) => (e: any) =>
    setState(state => ({ ...state, [key]: e.target.value }));

  const handleLogin = () => {
    if (password.trim() !== passwordConfirm.trim()) {
      alert("Passwords do not match");
      return;
    }
    setState(state => ({ ...state, loading: true }));
    // signUp(email.trim(), password.trim());

  };

  return (
    <div className= "background">
    <div className={"container center-content"}>
      <Typography variant={"h4"} style={{ margin: 20, fontWeight: "bold" }}>
        Create your account
      </Typography>
      <form className={"col"}>
      <AppTextField
        label={"Email"}
        onChange={handleInputChange("email")}
        style={{ marginBottom: 10 }}
      />
      <AppTextField
        label={"Password"}
        onChange={handleInputChange("password")}
        type={"password"}
        style={{ marginBottom: 10 }}
      />
      <AppTextField
        label={"Confirm Password"}
        onChange={handleInputChange("passwordConfirm")}
        type={"password"}
        style={{ marginBottom: 20 }}
      />
      </form>
      <ReactLoading type={loading ? "bubbles" : "blank"} color={"#fff"} />
      <Button
        variant="contained"
        color="primary"
        style={{ width: 170 }}
        onClick={handleLogin}
      >
        Sign up
      </Button>
    </div>
    </div>
  );
};

export default SignUpScreen;
