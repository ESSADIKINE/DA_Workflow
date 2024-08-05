// src/pages/VerifyOtp.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOtpAndSignupThunk } from '../redux/user/userSlice';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    const signupDetails = JSON.parse(localStorage.getItem('signupDetails'));
    if (!signupDetails) {
      alert('No signup details found. Please start the signup process again.');
      navigate('/signup');
      return;
    }

    const { nom, prenom, email, password } = signupDetails;
    const role = 'demandeur';

    try {
      const resultAction = await dispatch(
        verifyOtpAndSignupThunk({ Nom: nom, Prenom: prenom, Email: email, Pass: password, Role: role, otp })
      ).unwrap();

      if (resultAction.status === 'success') {
        alert('Signup successful!');
        localStorage.removeItem('signupDetails');
        navigate('/'); // Redirect to home page
      } else {
        alert(resultAction.message || 'Failed to verify OTP');
      }
    } catch (err) {
      console.error('Error verifying OTP and signing up:', err);
      alert('Signup failed!');
    }
  };

  return (
    <div>
      <h1>Verify OTP</h1>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <br />
      <button onClick={handleVerifyOtp}>Verify OTP</button>
    </div>
  );
};

export default VerifyOtp;
