import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  CssBaseline,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  Tooltip,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { sendOtpThunk, checkEmailThunk, setMode } from '../redux/user/userSlice';
import blogLogoGifL from '../assets/LogoL.gif';
import blogLogoGifD from '../assets/LogoD.gif';
import backgroundImg from '../assets/Decayeuxstm.webp';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get mode and user from Redux state
  const mode = useSelector((state) => state.auth.mode);
  const user = useSelector((state) => state.auth.user);

  // Log the current mode and user state for debugging
  console.log('Current mode:', mode);
  console.log('Current user:', user);

  const [showPassword, setShowPassword] = useState(false);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsLoading(true);
    try {
      const emailCheckResult = await dispatch(checkEmailThunk({ email })).unwrap();
      if (emailCheckResult.status === 'exists') {
        toast.error('Email already exists');
        setIsLoading(false);
        return;
      }

      const resultAction = await dispatch(sendOtpThunk({ email, fullName: `${prenom} ${nom}` })).unwrap();
      if (resultAction.status === 'success') {
        localStorage.setItem('signupDetails', JSON.stringify({ nom, prenom, email, password }));
        toast.success('OTP sent successfully!');
        navigate('/verify-otp');
      } else {
        toast.error(resultAction.message || 'Failed to send OTP');
      }
    } catch (err) {
      toast.error('Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log('Navigating to home page...');
      navigate('/');
    }
  }, [user, navigate]);

  const handleToggleMode = () => {
    dispatch(setMode());
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'left',
        }}
      />
      <Grid item xs={12} sm={8} md={5} elevation={6} sx={{ backgroundColor: theme.palette.background.paper }}>
      <Box display="flex" justifyContent="right" alignItems="center">
          <Tooltip title="Switch theme" arrow>
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ color: theme.palette.text.primary, mx: 2 }}
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <RouterLink to={'/'}>
            {mode === 'light' ? (
              <img src={blogLogoGifL} alt="Blog Logo Light" style={{ height: '80px' }} />
            ) : (
              <img src={blogLogoGifD} alt="Blog Logo Dark" style={{ height: '80px' }} />
            )}
          </RouterLink>
          <Typography component="h1" variant="h3" sx={{ mt: 5, mb: 3 }}>
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSendOtp} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nom"
              label="Last Name"
              name="nom"
              autoComplete="off"
              autoFocus
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="prenom"
              label="First Name"
              name="prenom"
              autoComplete="off"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel>Re-enter Password</InputLabel>
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                label="Re-enter Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                autoComplete="off"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                '&.Mui-disabled': { backgroundColor: theme.palette.primary.main },
              }}
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : 'Send OTP'}
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/signin" variant="body2">
                  {'Already have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
