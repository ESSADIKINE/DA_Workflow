import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './daApi';

// Define thunks to fetch data

export const fetchArticlesDemander = createAsyncThunk(
  'da/fetchArticlesDemander',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getArticlesDemander();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCollaborateur = createAsyncThunk(
  'da/fetchCollaborateur',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getCollaborateur();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllCT_Num = createAsyncThunk(
  'da/fetchAllCT_Num',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getAllCT_Num();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchDO_Devise = createAsyncThunk(
  'da/fetchDO_Devise',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getDO_Devise();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllDepot = createAsyncThunk(
  'da/fetchAllDepot',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getAllDepot();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchExpedition = createAsyncThunk(
  'da/fetchExpedition',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getExpedition();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllAffaire = createAsyncThunk(
  'da/fetchAllAffaire',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getAllAffaire();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchTaxe = createAsyncThunk(
  'da/fetchTaxe',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getTaxe();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllEU_Enumere = createAsyncThunk(
  'da/fetchAllEU_Enumere',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getAllEU_Enumere();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAllDemandeur = createAsyncThunk(
  'da/fetchAllDemandeur',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.getAllDemandeur();
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const daSlice = createSlice({
  name: 'da',
  initialState: {
    da: {
      DO_Ref: '',
      DO_Tiers: '',
      fullName: '',
      DO_Devise: '',
      DE_Intitule: '',
      E_Intitule: '',
      Affaire: '',
      DO_Coord01: '',
      DO_DateLivr: '',
      DUM: '',
      P_BRUT: '',
      COMMENTAIRES: '',
    },
    articles: [],
    articleOptions: [],
    loading: false,
    error: null,
    CT_Num: [],
    CO_No: [],
    DO_Devise: [],
    DE_No: [],
    DO_Expedit: [],
    CA_Num: [],
    DL_Taxe1: [],
    EU_Enumere: [],
    Demandeur: [],
    articlesDemander: [],
  },
  reducers: {
    setDa: (state, action) => {
      state.da = { ...state.da, ...action.payload };
    },
    addArticle: (state, action) => {
      state.articles.push(action.payload);
    },
    updateArticle: (state, action) => {
      const index = action.payload.index;
      state.articles[index] = action.payload.article;
    },
    removeArticle: (state, action) => {
      state.articles = state.articles.filter((_, i) => i !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollaborateur.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollaborateur.fulfilled, (state, action) => {
        state.loading = false;
        state.CO_No = action.payload;
      })
      .addCase(fetchCollaborateur.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllCT_Num.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCT_Num.fulfilled, (state, action) => {
        state.loading = false;
        state.CT_Num = action.payload;
      })
      .addCase(fetchAllCT_Num.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDO_Devise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDO_Devise.fulfilled, (state, action) => {
        state.loading = false;
        state.DO_Devise = action.payload;
      })
      .addCase(fetchDO_Devise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllDepot.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDepot.fulfilled, (state, action) => {
        state.loading = false;
        state.DE_No = action.payload;
      })
      .addCase(fetchAllDepot.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchExpedition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpedition.fulfilled, (state, action) => {
        state.loading = false;
        state.DO_Expedit = action.payload;
      })
      .addCase(fetchExpedition.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllAffaire.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAffaire.fulfilled, (state, action) => {
        state.loading = false;
        state.CA_Num = action.payload;
      })
      .addCase(fetchAllAffaire.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTaxe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaxe.fulfilled, (state, action) => {
        state.loading = false;
        state.DL_Taxe1 = action.payload;
      })
      .addCase(fetchTaxe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllEU_Enumere.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEU_Enumere.fulfilled, (state, action) => {
        state.loading = false;
        state.EU_Enumere = action.payload;
      })
      .addCase(fetchAllEU_Enumere.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllDemandeur.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDemandeur.fulfilled, (state, action) => {
        state.loading = false;
        state.Demandeur = action.payload;
      })
      .addCase(fetchAllDemandeur.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchArticlesDemander.pending, (state) => { 
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesDemander.fulfilled, (state, action) => {
        state.loading = false;
        state.articlesDemander = action.payload;
      })
      .addCase(fetchArticlesDemander.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setDa, addArticle, updateArticle, removeArticle } = daSlice.actions;

export default daSlice.reducer;
