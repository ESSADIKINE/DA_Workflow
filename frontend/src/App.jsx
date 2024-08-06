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
import CreateDemandePage from './pages/CreateDemandePage';
import DemandesPage from './pages/DemandesPage'; // Import the DemandesPage

const App = () => {
  const { user, mode } = useSelector((state) => state.auth);

  const theme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#e19c23',
      },
      secondary: {
        main: '#adadad',
      },
      background: {
        default: mode === 'light' ? '#f4f6f8' : '#1d1d1d',
        paper: mode === 'light' ? '#ffffff' : '#000000',
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
              <Route path="/" element={<HomePage />} />
              <Route path="/create-demande" element={<CreateDemandePage />} />
              <Route path="/demandes" element={<DemandesPage />} />
            </Route>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
          </Routes>
        </Router>
      </ThemeProvider>
      <ToastContainer
        theme={mode === 'light' ? 'light' : 'dark'}
        autoClose={3000}
        position="top-center"
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  );
};

export default App;
