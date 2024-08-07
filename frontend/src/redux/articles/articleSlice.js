import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    fetchAllArticles, 
    updateArticle, 
    searchArticles, 
    fetchArticlesByFournisseur, 
    fetchArticlesInStock 
} from './articleApi';


export const fetchAllArticlesThunk = createAsyncThunk('article/fetchAllArticles', async (_, thunkAPI) => {
    try {
        const response = await fetchAllArticles();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const updateArticleThunk = createAsyncThunk('article/updateArticle', async ({ id, article }, thunkAPI) => {
    try {
        const response = await updateArticle(id, article);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const searchArticlesThunk = createAsyncThunk('article/searchArticles', async (key, thunkAPI) => {
    try {
        const response = await searchArticles(key);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const fetchArticlesByFournisseurThunk = createAsyncThunk('article/fetchArticlesByFournisseur', async (fournisseurId, thunkAPI) => {
    try {
        const response = await fetchArticlesByFournisseur(fournisseurId);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const fetchArticlesInStockThunk = createAsyncThunk('article/fetchArticlesInStock', async (_, thunkAPI) => {
    try {
        const response = await fetchArticlesInStock();
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

const articleSlice = createSlice({
    name: 'article',
    initialState: {
        articles: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllArticlesThunk.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllArticlesThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.articles = action.payload.data.articles; // Ensure the payload is correctly accessed
        })
        .addCase(fetchAllArticlesThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.error;
        })
            // Similarly handle other thunks
            .addCase(updateArticleThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateArticleThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.articles.findIndex(article => article.AR_Ref === action.payload.data.AR_Ref);
                if (index !== -1) {
                    state.articles[index] = action.payload.data;
                }
            })
            .addCase(updateArticleThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(searchArticlesThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchArticlesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload.data; // Ensure the payload is correctly accessed
            })
            .addCase(searchArticlesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(fetchArticlesByFournisseurThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchArticlesByFournisseurThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload.data; // Ensure the payload is correctly accessed
            })
            .addCase(fetchArticlesByFournisseurThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(fetchArticlesInStockThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchArticlesInStockThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = action.payload.data; // Ensure the payload is correctly accessed
            })
            .addCase(fetchArticlesInStockThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            });
    },
});

export default articleSlice.reducer;
