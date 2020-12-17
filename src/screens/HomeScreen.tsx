import React, { useState, useEffect } from "react";
import "../App.css";
import { connect } from 'react-redux';
import { logout } from "../actions/authActions";
import { Button, Typography } from "@material-ui/core";
import SideBarComponent from '../components/Common/SideBar';

export const HomeScreen = (props: any) => {

  useEffect(()=>{
    if(!props.isLoggedIn && !props.user)
    {
      loggedOut(props);
    }
  },[props.isLoggedIn]);
 
  const loggedOut = (props: any) => {
    props.history.push("/");
  }

  const handleLogout = () => {
    props.logout();
  };

  return (
  <div>
      <Button
        variant="contained"
        onClick={handleLogout}
        color="primary"
        style={{ width: "100%", 
        maxWidth: 170, 
        position: "absolute", right: 10, top:10}}
      >
        Logout
      </Button>
      <div className="background" >
      <Typography variant={"h4"} style={{ fontWeight: "bold", margin: 20 }}>
        Home Screen
      </Typography>
    </div>
  </div>
  );
  // return (
  //   <div className="background">
  //     <SideBarComponent />
  //   </div>
  // );
};

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => {
    return dispatch(logout());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)
