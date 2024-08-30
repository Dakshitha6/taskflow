import { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup } from "./firebase.config";
import { NextRouter } from "next/router";

export const handleLogin = async (email: string, password: string, router: NextRouter) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/dashboard"); 
  } catch (error: any) {
    console.error("Error logging in:", error.message);
  }
};

export const handleGoogleLogin = async (router: NextRouter) => {
  try {
    await signInWithPopup(auth, googleProvider);
    router.push("/dashboard"); 
  } catch (error: any) {
    console.error("Error logging in with Google:", error.message);
  }
};
