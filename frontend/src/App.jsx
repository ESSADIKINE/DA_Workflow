// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import VerifyOtp from './components/VerifyOtp';
import HeaderLayout from './layouts/HeaderLayout';

const App = () => {
  const { user, mode } = useSelector((state) => state.auth);

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#e19c23',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: mode === 'light' ? '#f4f6f8' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1d1d1d',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary: mode === 'light' ? '#e19c23' : '#bdbdbd',
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route element={<HeaderLayout />}>
              {/* <Route path="/" element={user ? <HomePage /> : <Navigate to="/signup" />} /> */}
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
      <ToastContainer theme={mode === 'light' ? 'light' : 'dark'} autoClose={3000} position="top-center" pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
};

export default App;
