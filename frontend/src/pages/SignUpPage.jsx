import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtpThunk, checkEmailThunk } from '../redux/user/userSlice';

const SignUpPage = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (password !== rePassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Check if email exists
      const emailCheckResult = await dispatch(checkEmailThunk({ email })).unwrap();
      console.log('Email check result:', emailCheckResult);
      if (emailCheckResult.status === 'exists') {
        alert('Email already exists');
        return;
      }

      const resultAction = await dispatch(sendOtpThunk({ email, fullName: `${prenom} ${nom}` })).unwrap();
      console.log('Result action:', resultAction); // Log the result for debugging
      if (resultAction.status === 'success') { // Check the actual response status
        localStorage.setItem('signupDetails', JSON.stringify({ nom, prenom, email, password }));
        alert('OTP sent successfully!');
        navigate('/verify-otp'); // Navigate to OTP verification page
      } else {
        alert(resultAction.message || 'Failed to send OTP'); // Provide more information
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      alert('Failed to send OTP');
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input
        type="text"
        placeholder="Enter your last name"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter your first name"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
      />
      <br />
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
      <input
        type="password"
        placeholder="Re-enter your password"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
      />
      <br />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
};

export default SignUpPage;
