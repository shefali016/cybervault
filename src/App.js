import "./App.css";
import React, { useEffect } from "react";
import AssetUploader from "./components/Assets/AssetUploader";
import AssetList from "./components/Assets/AssetList";
import { initFirebase } from "./firebase";

initFirebase();

function App() {
  return (
    <div className="App">
      <AssetUploader />
      <AssetList />
    </div>add_app_badge_if_required.sh
  );
}

export default App;
