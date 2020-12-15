import "./App.css";
import { initFirebase } from "./firebaseConfig";
import { Router } from "react-router-dom";
import Routes from "./routes/navigationRoutes";
import history from "./services/history"
import React from "react";

initFirebase();

function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}
export default App
