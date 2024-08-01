import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOtpAndSignupThunk } from '../redux/user/userSlice';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    console.log('Starting handleVerifyOtp'); // Log entry point
    const signupDetails = JSON.parse(localStorage.getItem('signupDetails'));
    if (!signupDetails) {
      alert('No signup details found. Please start the signup process again.');
      console.log('No signup details found in localStorage'); // Log missing data
      navigate('/signup');
      return;
    }

    const { nom, prenom, email, password } = signupDetails;
    const role = 'demandeur'; // Ensure role is included
    console.log('Signup details from localStorage:', signupDetails); // Log signup details

    try {
      const resultAction = await dispatch(
        verifyOtpAndSignupThunk({ Nom: nom, Prenom: prenom, Email: email, Pass: password, Role: role, otp })
      ).unwrap();
      console.log('Verify OTP result:', resultAction); // Log the result for debugging

      if (resultAction.status === 'success') { // Check the actual response status
        alert('Signup successful!');
        localStorage.removeItem('signupDetails');
        console.log('Signup successful, redirecting to signin'); // Log success
        navigate('/signin'); // Redirect to login page
      } else {
        console.log('Failed to verify OTP:', resultAction.message || 'Failed to verify OTP'); // Log failure
        alert(resultAction.message || 'Failed to verify OTP'); // Provide more information
      }
    } catch (err) {
      console.error('Error verifying OTP and signing up:', err); // Log error
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
