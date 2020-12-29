import React, { useState, useEffect } from "react";
import "../App.css";
import { connect } from 'react-redux';
import { login, googleLogin } from "../actions/authActions";
import AppTextField from "../components/AppTextField";
import { Button, Typography } from "@material-ui/core";
import ReactLoading from "react-loading";
import * as Types from '../utils/types';
import { makeStyles } from '@material-ui/core/styles';
import "firebase/auth";
import GoogleAuthComponent from '../components/SocialAuth/GoogleAuthComponent';
import { BOLD, CENTER } from "utils/constants/stringConstants";
import { PRIMARY_COLOR } from "utils/constants/colorsConstants";

const initialState = {
  email: "",
  password: "",
  loading: false
};

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
  const classes = useStyles();
  return (
  <div className= "authScreenContainer">
          <Typography variant={"h2"} className={classes.title}>
        Cyber Vault
      </Typography>
    <div className={"container center-content"}>

      <form className={"col"}>
        <Typography variant={"h4"} className={classes.text}>
          Login
        </Typography>
        <AppTextField
          label="Email"
          onChange={handleInputChange("email")}
          className={classes.generalMargin}
        />
        <AppTextField
          label="Password"
          onChange={handleInputChange("password")}
          type={"password"}
        />
      </form>
      <ReactLoading type={loading ? "bubbles" : "blank"} color={"#fff"} />
      <Button
        variant="contained"
        onClick={handleLogin}
        color="primary"
        className={classes.button}
      >
        Login
      </Button>
      <GoogleAuthComponent props={props}/>
      <Typography className={classes.bottomText} variant={"body1"}>
        OR
      </Typography>
      <Button
        variant="contained"
        onClick={navigateToSignUp}
        color="primary"
        className={classes.button}
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
  googleAuth: () => {
    return dispatch(googleLogin())
  }
});
const useStyles = makeStyles((theme) => ({
  title: {
      color: PRIMARY_COLOR,
      margin: 20, 
      fontWeight: BOLD,
  },
  generalMargin: {
    marginBottom: 10 
  },
 
  bottomText:
  {
    marginTop: 10,
    marginBottom: 10 
  },
button:{
  width: "100%", 
  maxWidth: 185 
   },
   text:{
     alignSelf:CENTER,
     fontWeight:600,
     marginBottom: 20
   },
   label:{
     backgroundColor: '#ffffff'
   }
}));
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen)
