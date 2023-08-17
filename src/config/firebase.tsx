import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from"firebase/storage";
import {dataAPIKeys} from "./dataAPIKeys";

const firebaseConfig = {
    apiKey: dataAPIKeys.REACT_APP_FIREBASE_API_KEY,
    authDomain: dataAPIKeys.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: dataAPIKeys.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: dataAPIKeys.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: dataAPIKeys.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: dataAPIKeys.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const GoogleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);