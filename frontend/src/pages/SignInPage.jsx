// src/pages/SignInPage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginThunk } from '../redux/user/userSlice';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      console.log('User logged in, redirecting to home page'); // Log user login status
      navigate('/'); // Redirect to home page if already logged in
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      console.log('Attempting to login with:', { email, password }); // Log login attempt
      const resultAction = await dispatch(loginThunk({ email, password })).unwrap();
      console.log('Login result:', resultAction); // Log the result of the login attempt
      if (resultAction.status === 'success') {
        navigate('/'); // Redirect to home page
      } else {
        alert(resultAction.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      alert('Login failed!');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default SignInPage;
