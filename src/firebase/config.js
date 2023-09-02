// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


export const firebaseConfig = {
  apiKey: "AIzaSyDiUF5FNpQoVAL8HWmbqZxLiw9UOnn3qDQ",
  authDomain: "eshop-b8924.firebaseapp.com",
  projectId: "eshop-b8924",
  storageBucket: "eshop-b8924.appspot.com",
  messagingSenderId: "633420713126",
  appId: "1:633420713126:web:2d04f88fe4ac4b3717f867"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app