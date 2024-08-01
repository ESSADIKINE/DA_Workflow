import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendOtp, signUp, login } from '../api';

// Async thunks for handling API requests
export const sendOtpThunk = createAsyncThunk('auth/sendOtp', async ({ email, fullName }, thunkAPI) => {
  try {
    const response = await sendOtp(email, fullName);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const signUpThunk = createAsyncThunk('auth/signUp', async ({ Nom, Prenom, Email, Pass, Role, otp }, thunkAPI) => {
  try {
    const response = await signUp(Nom, Prenom, Email, Pass, Role, otp);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const loginThunk = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await login(email, password);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    otp: '',
    email: '',
    user: null,
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    setOtp: (state, action) => {
      state.otp = action.payload.otp;
      state.email = action.payload.email;
    },
    clearOtp: (state) => {
      state.otp = '';
      state.email = '';
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.otp = action.payload.otp;
        state.email = action.payload.email;
      })
      .addCase(sendOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.otp = '';
        state.email = '';
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { setOtp, clearOtp, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
