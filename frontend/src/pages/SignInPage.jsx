import React, { useState, useEffect } from 'react';
import { useTheme } from '@emotion/react';
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
import { loginThunk, setMode } from '../redux/user/userSlice';
import blogLogoGifL from '../assets/LogoL.gif';
import blogLogoGifD from '../assets/LogoD.gif';
import backgroundImg from '../assets/Decayeuxstm.webp';
import { toast } from 'react-toastify';

const SignInPage = () => {
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      console.log('Navigating to home page...');
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const resultAction = await dispatch(loginThunk({ email, password })).unwrap();
      console.log('Login result:', resultAction);
      if (resultAction.status === 'success') {
        navigate('/');
      } else {
        toast.error(resultAction.message || 'Login failed');
      }
    } catch (err) {
      toast.error('Login failed!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMode = () => {
    dispatch(setMode());
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} elevation={6} sx={{ backgroundColor: theme.palette.background.paper }}>
      <Box>
          <Tooltip title="Switch theme" arrow>
            <IconButton
              onClick={handleToggleMode}
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
          <RouterLink to={'/'} >
            {mode === 'light' ? (
              <img src={blogLogoGifL} alt="Blog Logo Light" style={{ height: '80px' }} />
            ) : (
              <img src={blogLogoGifD} alt="Blog Logo Dark" style={{ height: '80px' }} />
            )}
          </RouterLink>
          <Typography component="h1" variant="h3" sx={{ mt: 10, mb: 5 }}>
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {isLoading ? <CircularProgress size={24} sx={{ color: '#ffffff' }} /> : 'Sign In'}
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
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
          backgroundPosition: 'right',
        }}
      />
    </Grid>
  );
};

export default SignInPage;
