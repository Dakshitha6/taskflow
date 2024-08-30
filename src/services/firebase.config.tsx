import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBfsKmYwVSsM2nvDlsOdnKIGTJ7w_GqWjI",
    authDomain: "voosh-3bfc1.firebaseapp.com",
    projectId: "voosh-3bfc1",
    storageBucket: "voosh-3bfc1.appspot.com",
    messagingSenderId: "251879130440",
    appId: "1:251879130440:web:81c6ec68e7ed852bf15f7d",
    measurementId: "G-E71PPPHVKJ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { auth, googleProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword,signInWithPopup };
