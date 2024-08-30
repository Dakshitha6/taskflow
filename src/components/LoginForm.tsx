"use client";
import { auth, googleProvider, signInWithEmailAndPassword, signInWithPopup } from "@/services/firebase.config";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      router.push("/dashboard"); 
    } catch (error: any) {
      handleError(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      handleError(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleError = (error: any) => {
    
    switch (error.code) {
      case "auth/invalid-email":
        toast.error("Invalid email address.");
        break;
      case "auth/user-disabled":
        toast.error("This account has been disabled.");
        break;
      case "auth/user-not-found":
        toast.error("No user found with this email.");
        break;
      case "auth/wrong-password":
        toast.error("Incorrect password.");
        break;
      case "auth/popup-closed-by-user":
        toast.error("Google sign-in popup was closed.");
        break;
      case "auth/network-request-failed":
        toast.error("Network error. Please try again.");
        break;
      default:
        toast.error("An unknown error occurred.");
        break;
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Login to TaskFlow
      </h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-6 relative">
        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-9 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Login
      </button>

      <button
        onClick={handleGoogleLogin}
        className="w-full bg-red-500 text-white py-2 rounded-md mt-4 hover:bg-red-600 transition duration-200"
      >
        Login with Google
      </button>

      <p className="text-center text-gray-600 mt-4">
        Don&quot;t have an account?
        <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
      </p>
    </div>
  );
}

export default LoginComponent;
