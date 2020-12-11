import "./App.css";
import React, { useEffect, useState }from "react";
import { connect } from 'react-redux';
import { initFirebase } from "./firebaseConfig";
import { Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { createBrowserHistory } from "history";
import HomeScreen from "./screens/HomeScreen";

initFirebase();
const rootHistory = createBrowserHistory();

function App() {
  const [state, setState] = useState(false);
  const auth = state;
  const handleLogin = (auth: boolean) => {
    setState(state => ( auth ));
  };

  return (

    <Router history={rootHistory}>
      <Switch>
        <Route
          path="/"
          exact
          render={(props: any) => (
            <LoginScreen
              {...props}
              onLogin={handleLogin}
            />
          )}
        />
        <Route path="/signup" component={SignUpScreen} />
        <Route path="/home" component={HomeScreen} />
      </Switch>
    </Router>
  );
}
const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

export default connect(
  mapStateToProps,
  null,
)(App)
