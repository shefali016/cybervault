import "./App.css";
import React, { useEffect, useState }from "react";
import AssetUploader from "./components/Assets/AssetUploader";
import AssetList from "./components/Assets/AssetList";
import { initFirebase } from "./firebaseConfig";
import { Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { createBrowserHistory } from "history";

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
      </Switch>
    </Router>
  );
}

export default App;
