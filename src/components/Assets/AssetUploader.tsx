import React, { useState } from "react";
import { createAsset, getDownloadUrl, uploadMedia } from "../../apis/assets";
import { generateUid } from "../../utils/index";
import firebase from "firebase";

const initialUploadState = {
  state: '',
  progress: 0,
  task: null as any
};

function AssetUploader() {
  const [file, setFile] = useState();

  const [uploadState, setUploadState] = useState(initialUploadState);
  const { state, progress, task } = uploadState;

  const handleUpload = () => {
    const id = generateUid();
    const uploadTask = uploadMedia(id, file);
    uploadTask.on(
      "state_changed",
      function(snapshot) {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadState(state => ({
          ...state,
          progress,
          state: snapshot.state
        }));
      },
      function() {
        setUploadState(initialUploadState);
        alert(
          "Sorry there was a problem uploading this file. Please try again."
        );
      },
      async function() {
        setUploadState(initialUploadState);
        alert("File uploaded successfully!");
        const url = await getDownloadUrl(id);
        createAsset({
          id,
          original: { url }
        });
      }
    );
    setUploadState(state => ({ ...state, task: uploadTask }));
  };

  const handleFileChange = (event: any) => {
    console.log(event.target.files[0])
    setFile(event.target.files[0]);
  };

  const renderProgress = () => {
    if (progress) {
      return (
        <div
          style={{
            width: 200,
            backgroundColor: "#e6e6e6",
            height: 20,
            alignItems: "center",
            borderRadius: 5,
            borderWidth: 4,
            borderColor: "#fff",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              height: 20,
              width: 200 * (progress / 100),
              backgroundColor: "#ccff00",
              borderRadius: 5
            }}
          />
        </div>
      );
    }
    return null;
  };

  const renderTaskControl = () => {
    if (!task && progress !== 100) {
      return null;
    }
    let title;
    let action;

    switch (state) {
      case firebase.storage.TaskState.RUNNING:
        console.log("Upload is running");
        action = task.pause;
        title = "Pause";
        break;
      case firebase.storage.TaskState.PAUSED:
        console.log("Upload is paused");
        action = task.resume;
        title = "Resume";
        break;
    }

    return (
      <button onClick={action} style={{ marginTop: 30 }}>
        {title}
      </button>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        {renderProgress()}
        {renderTaskControl()}
        <input
          type={"file"}
          onChange={handleFileChange}
          style={{ marginTop: 30 }}
        />
        <button style={{ marginTop: 30 }} onClick={handleUpload}>
          Upload
        </button>
      </header>
    </div>
  );
}

export default AssetUploader;
