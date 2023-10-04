import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage"

import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
const app = firebase.initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
});

const db = app.firestore();
const auth = firebase.auth();
const storage = getStorage(app);
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const fbProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// export default db;
export { db, auth, storage, twitterProvider, fbProvider, googleProvider }