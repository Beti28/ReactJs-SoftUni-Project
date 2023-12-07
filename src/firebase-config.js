import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth,
  createUserWithEmailAndPassword,
    signOut,
  signInWithEmailAndPassword, } from "firebase/auth";


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
export const db = getFirestore(app)
export const storage = getStorage(app)


const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    let errMessage = err.message;
    let errCode = err.code;

    console.log("err message" + errMessage);
    console.log("err code" + errCode);

    if (errCode == "auth/wrong-password") {
      errMessage = "Invalid email or password.";
    } else if (errCode == "auth/user-not-found") {
      errMessage = "Invalid email or password.";
    } else if (errCode == "auth/network-request-failed") {
      errMessage =
        "Error connecting to the server. Please check your network connection and try again.";
    }

    return errMessage;
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    let errMessage = err.message;
    let errCode = err.code;

    if (errCode == "auth/email-already-in-use") {
      errMessage = "The email already exist.";
    } else if (errCode == "auth/user-not-found") {
      errMessage = "Invalid email or password.";
    } else if (errCode == "auth/network-request-failed") {
      errMessage =
        "Error connecting to the server. Please check your network connection and try again.";
    }

    return errMessage;
  }
};

const logout = () => {
  signOut(auth);
};

export {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};