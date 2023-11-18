import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCnGQwVDWTTfZ_sNcF4UZ3kIqrfg_YV9cQ",
  authDomain: "reactjs-softuni-project.firebaseapp.com",
  projectId: "reactjs-softuni-project",
  storageBucket: "reactjs-softuni-project.appspot.com",
  messagingSenderId: "229415181706",
  appId: "1:229415181706:web:36bd6356551929336ebc73",
  measurementId: "G-ETYGWXHVGS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
