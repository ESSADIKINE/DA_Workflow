import { configureStore } from '@reduxjs/toolkit';
import authReducer from './user/userSlice';
import demandeReducer from './demandes/demandeSlice';
import articleReducer from './articles/articleSlice';
import fournisseurReducer from './fournisseurs/fournisseurSlice';
import daReducer from './da/daSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    demande: demandeReducer,
    article: articleReducer,
    fournisseur: fournisseurReducer,
    da: daReducer,
  },
});

export default store;