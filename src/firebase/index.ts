import app from "firebase/app";

const config = {
  apiKey: "AIzaSyA0BdrojB50-mTWwLdK4udDSiZP8vpQHjw",
  authDomain: "cybervault-8cfe9.firebaseapp.com",
  databaseURL: "https://cybervault-8cfe9.firebaseio.com",
  projectId: "cybervault-8cfe9",
  storageBucket: "cybervault-8cfe9.appspot.com",
  messagingSenderId: "33561487991",
  appId: "1:33561487991:web:a2b2f3c7edd1f75cf5f472",
  measurementId: "G-HL31DXGLWC"
};

export const initFirebase = () => app.initializeApp(config);
