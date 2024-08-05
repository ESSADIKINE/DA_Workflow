// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user/userSlice';
import demandeReducer from './demandes/demandeSlice'; // Import the demande slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    demande: demandeReducer, // Add the demande reducer
  },
});

export default store;
