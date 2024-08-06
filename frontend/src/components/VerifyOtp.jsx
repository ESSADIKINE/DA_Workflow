import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyOtpAndSignupThunk, setMode } from '../redux/user/userSlice';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import OtpInput from 'react-otp-input';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import blogLogoGifL from '../assets/LogoL.gif';
import blogLogoGifD from '../assets/LogoD.gif';
import backgroundImg from '../assets/Decayeuxstm-min.png'; // Import the background image
import { toast } from 'react-toastify';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // Get mode from Redux state
  const mode = useSelector((state) => state.auth.mode);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const signupDetails = JSON.parse(localStorage.getItem('signupDetails'));
    if (!signupDetails) {
      toast.error('No signup details found. Please start the signup process again.');
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
        toast.success('Signup successful!');
        localStorage.removeItem('signupDetails');
        navigate('/'); // Redirect to home page
      } else {
        toast.error(resultAction.message || 'Failed to verify OTP');
      }
    } catch (err) {
      console.error('Error verifying OTP and signing up:', err);
      toast.error('Signup failed!');
    }
  };

  const handleToggleMode = () => {
    dispatch(setMode());
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <CssBaseline />
      <Paper sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px', backgroundColor: theme.palette.background.paper }}>
        <Box display="flex" justifyContent="right" alignItems="center" sx={{ width: '100%' }}>
          <Tooltip title="Switch theme" arrow>
            <IconButton onClick={handleToggleMode} sx={{ color: theme.palette.text.primary, mx: 2 }}>
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={mode === 'light' ? blogLogoGifL : blogLogoGifD} alt="Blog Logo" style={{ height: '80px', marginBottom: '40px' }} />
          <Typography component="h1" variant="h4" sx={{ mb: 5 }}>
            Verify OTP
          </Typography>
          <Box component="form" noValidate onSubmit={handleVerifyOtp} sx={{ mt: 1 }}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              separator={<span><strong>.</strong></span>}
              inputStyle={{
                width: '4rem',
                height: '4rem',
                margin: '0 0.5rem',
                fontSize: '2rem',
                borderRadius: 4,
                border: '1px solid rgba(0,0,0,0.3)',
              }}
              renderInput={(props) => <input {...props} />}
            />
            <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
              Verify OTP
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default VerifyOtp;
