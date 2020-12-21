import React from "react";
import { Switch } from 'react-router-dom';
import Route from "./index";
import { connect } from 'react-redux';
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/HomeScreen";
import ProjectScreen from "../screens/projects/ProjectsScreen";

function Routes(): JSX.Element {

  return (
    <Switch>
      <Route
        path="/"
        exact
        component={LoginScreen}
      />
      <Route path="/signup" component={SignUpScreen} />
      <Route path="/home" component={HomeScreen} />
      <Route path="/projects" component={ProjectScreen} />
      <Route component={LoginScreen} />
    </Switch>
  );
}
const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

export default connect(
  mapStateToProps,
  null,
)(Routes)