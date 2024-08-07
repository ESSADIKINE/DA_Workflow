import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllFournisseurs, searchFournisseur, fetchFournisseurByARDesign } from './fournisseurApi';

export const fetchAllFournisseursThunk = createAsyncThunk('fournisseur/fetchAllFournisseurs', async (_, thunkAPI) => {
    try {
        const response = await fetchAllFournisseurs();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const searchFournisseurThunk = createAsyncThunk('fournisseur/searchFournisseur', async (key, thunkAPI) => {
    try {
        const response = await searchFournisseur(key);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const fetchFournisseurByARDesignThunk = createAsyncThunk('fournisseur/fetchFournisseurByARDesign', async (AR_Design, thunkAPI) => {
    try {
        const response = await fetchFournisseurByARDesign(AR_Design);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

const fournisseurSlice = createSlice({
    name: 'fournisseur',
    initialState: {
        fournisseurs: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllFournisseursThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllFournisseursThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.fournisseurs = action.payload.data.fournisseurs;
            })
            .addCase(fetchAllFournisseursThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(searchFournisseurThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchFournisseurThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.fournisseurs = action.payload.data.fournisseurs;
            })
            .addCase(searchFournisseurThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(fetchFournisseurByARDesignThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFournisseurByARDesignThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.fournisseurs = action.payload.data.fournisseurs;
            })
            .addCase(fetchFournisseurByARDesignThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    },
});

export default fournisseurSlice.reducer;
