import React from "react";
import './GoogleAuth.css';
import { Button } from "@material-ui/core";
import googleIcon from '../../assets/googleSignInButton.png';

export const GoogleAuthComponent = (props: any) => {
  return (
    <Button className="login-provider-button" variant="contained"
      style={{ width: "100%", maxWidth: 185, maxHeight:40,marginTop:10, borderRadius:0.8 }}
      onClick={() => props.props.googleAuth()}>
      <img src={googleIcon} alt="google icon"/>
   </Button>
  );
};

export default GoogleAuthComponent;
