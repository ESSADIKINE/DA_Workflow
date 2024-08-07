import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import VerifyOtp from './components/VerifyOtp';
import MainLayout from './layouts/MainLayout';
import CreateDemandePage from './pages/CreateDemandePage';
import DemandesPage from './pages/DemandesPage';
import ArticlesPage from './pages/ArticlesPage';
import FournisseursPage from './pages/FournisseursPage';
import ContactSuppliersPage from './pages/ContacterFournisseurs'; // Import the new page
import AddArticlesForm from './pages/CreateDaArticles';
import AddDAForm from './pages/CreateDa';

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
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-demande" element={<CreateDemandePage />} />
              <Route path="/demandes" element={<DemandesPage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/fournisseurs" element={<FournisseursPage />} />
              <Route path="/contact-suppliers" element={<ContactSuppliersPage />} />
              <Route path="/add-da" element={<AddDAForm />} />
              <Route path="/add-articles" element={<AddArticlesForm />} />
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
