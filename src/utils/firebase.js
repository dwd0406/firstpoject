import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAPh4zYG10r23wl15tjYYP3pawy0wRyQU8",
  authDomain: "sunbreak-72e62.firebaseapp.com",
  projectId: "sunbreak-72e62",
  storageBucket: "sunbreak-72e62.appspot.com",
  messagingSenderId: "25147109718",
  appId: "1:25147109718:web:4ae7e9001d2c5364dc66f7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const dataBase = getDatabase(app);