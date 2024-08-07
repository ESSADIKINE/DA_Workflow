import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user/userSlice';
import demandeReducer from './demandes/demandeSlice';
import articleReducer from './articles/articleSlice';
import fournisseurReducer from './fournisseurs/fournisseurSlice'; // Import the fournisseur slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    demande: demandeReducer,
    article: articleReducer,
    fournisseur: fournisseurReducer, // Add the fournisseur reducer
  },
});

export default store;