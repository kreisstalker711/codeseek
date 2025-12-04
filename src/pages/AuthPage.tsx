import React, { useState } from 'react';
// Note: You need to set up Firebase in your project for this to work.
// import { auth } from '../firebase-config';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Firebase logic would go here
    console.log(`${isLogin ? 'Logging in' : 'Signing up'} with`, { email, password });
    alert('Auth functionality to be implemented with Firebase/Supabase.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600" required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600" required />
          <button type="submit" className="w-full p-3 bg-teal-600 text-white rounded hover:bg-teal-700 font-semibold">
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)} className="mt-4 text-center w-full text-teal-600 dark:text-teal-400 hover:underline">
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthPage;