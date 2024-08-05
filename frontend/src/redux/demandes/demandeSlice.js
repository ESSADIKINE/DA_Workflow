import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createDemande,
  getDemandes,
  updateDemande,
  deleteDemande,
  getArticlesBySelection,
} from './demandeApi';

export const createDemandeThunk = createAsyncThunk('demande/createDemande', async (demande, thunkAPI) => {
  try {
    const response = await createDemande(demande);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const getDemandesThunk = createAsyncThunk('demande/getDemandes', async (_, thunkAPI) => {
  try {
    const response = await getDemandes();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const updateDemandeThunk = createAsyncThunk('demande/updateDemande', async ({ id, demande }, thunkAPI) => {
  try {
    const response = await updateDemande(id, demande);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const deleteDemandeThunk = createAsyncThunk('demande/deleteDemande', async (id, thunkAPI) => {
  try {
    const response = await deleteDemande(id);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const getArticlesBySelectionThunk = createAsyncThunk('demande/getArticlesBySelection', async (key, thunkAPI) => {
  try {
    const response = await getArticlesBySelection(key);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const demandeSlice = createSlice({
  name: 'demande',
  initialState: {
    demandes: [],
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDemandeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDemandeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.demandes.push(action.payload.data);
      })
      .addCase(createDemandeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getDemandesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDemandesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.demandes = action.payload.data;
      })
      .addCase(getDemandesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateDemandeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDemandeThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.demandes.findIndex((demande) => demande.id === action.payload.data.id);
        if (index !== -1) {
          state.demandes[index] = action.payload.data;
        }
      })
      .addCase(updateDemandeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(deleteDemandeThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDemandeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.demandes = state.demandes.filter((demande) => demande.id !== action.meta.arg);
      })
      .addCase(deleteDemandeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getArticlesBySelectionThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticlesBySelectionThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.data;
      })
      .addCase(getArticlesBySelectionThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default demandeSlice.reducer;
