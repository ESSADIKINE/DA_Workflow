import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOtpThunk, signUpThunk, clearOtp } from '../redux/users/authSlice';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [otpInput, setOtpInput] = useState('');
  const dispatch = useDispatch();
  const otpState = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const resultAction = await dispatch(sendOtpThunk({ email, fullName }));
      if (sendOtpThunk.fulfilled.match(resultAction)) {
        alert('OTP sent successfully!');
      } else {
        alert(resultAction.payload.error);
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      alert('Failed to send OTP');
    }
  };

  const handleSignup = async () => {
    try {
      const [Prenom, Nom] = fullName.split(' ');
      const resultAction = await dispatch(
        signUpThunk({ Nom, Prenom, Email: email, Pass: password, Role: role, otp: otpInput })
      );
      if (signUpThunk.fulfilled.match(resultAction)) {
        alert('Signup successful!');
        dispatch(clearOtp());
        navigate('/'); // Redirect to home page
      } else {
        alert(resultAction.payload.error);
      }
    } catch (err) {
      console.error('Error signing up:', err);
      alert('Signup failed!');
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <input
        type="text"
        placeholder="Enter your full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
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
      <button onClick={handleSendOtp}>Send OTP</button>
      <br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={otpInput}
        onChange={(e) => setOtpInput(e.target.value)}
      />
      <br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
