'use client';
import { auth, createUserWithEmailAndPassword, googleProvider, signInWithPopup } from '@/services/firebase.config';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function SignupComponent() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();


  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard'); 
    } catch (error:any) {
      setError(error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard'); 
    } catch (error:any) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Sign Up for TaskFlow
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

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

      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
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

      <div className="mb-6 relative">
        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
        <input
          type={showConfirmPassword ? 'text' : 'password'}
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="button"
          onClick={toggleConfirmPasswordVisibility}
          className="absolute right-3 top-9 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button
        onClick={handleSignup}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Sign Up
      </button>

      <button
        onClick={handleGoogleSignup}
        className="w-full bg-red-500 text-white py-2 rounded-md mt-4 hover:bg-red-600 transition duration-200"
      >
        Sign Up with Google
      </button>

      <p className="text-center text-gray-600 mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500 hover:underline">Login</a>
      </p>
    </div>
  );
}

export default SignupComponent;
