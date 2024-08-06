import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkEmail, sendOtp, signUp, login, signOutApi } from './authApi';

// Load user info and mode from localStorage
const userInfo = JSON.parse(localStorage.getItem('user-info')) || {};
const savedMode = localStorage.getItem('mode') || 'light';

// Async thunk for checking if email exists
export const checkEmailThunk = createAsyncThunk(
  'auth/checkEmail',
  async ({ email }, thunkAPI) => {
    try {
      const response = await checkEmail(email);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Async thunk for sending OTP
export const sendOtpThunk = createAsyncThunk(
  'auth/sendOtp',
  async ({ email, fullName }, thunkAPI) => {
    try {
      const response = await sendOtp(email, fullName);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Async thunk for verifying OTP and completing signup
export const verifyOtpAndSignupThunk = createAsyncThunk(
  'auth/verifyOtpAndSignup',
  async ({ Nom, Prenom, Email, Pass, Role, otp }, thunkAPI) => {
    try {
      const response = await signUp(Nom, Prenom, Email, Pass, Role, otp);
      return response; // Ensure this includes user and token
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Async thunk for logging in
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await login(email, password);
      return response; // Ensure this includes user and token
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Async thunk for logging out
export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const response = await signOutApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    mode: savedMode,
    user: userInfo.user || null,
    token: userInfo.token || null,
    otp: '',
    email: '',
    loading: false,
    error: null,
  },
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('mode', state.mode);
    },
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
      localStorage.setItem('user-info', JSON.stringify({ user: state.user, token: state.token }));
    },
    signOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user-info');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkEmailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkEmailThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(checkEmailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(sendOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtpThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(verifyOtpAndSignupThunk.pending, (state) => {
        console.log('verifyOtpAndSignupThunk pending'); // Log pending state
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpAndSignupThunk.fulfilled, (state, action) => {
        console.log('verifyOtpAndSignupThunk fulfilled with:', action.payload); // Log fulfilled state
        state.loading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        localStorage.setItem('user-info', JSON.stringify({ user: state.user, token: state.token }));
      })
      .addCase(verifyOtpAndSignupThunk.rejected, (state, action) => {
        console.error('verifyOtpAndSignupThunk rejected with:', action.payload.error); // Log rejected state
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.token;
        localStorage.setItem('user-info', JSON.stringify({ user: state.user, token: state.token }));
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem('user-info');
        state.loading = false;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { setMode, setOtp, clearOtp, setUser, signOut } = userSlice.actions;
export default userSlice.reducer;
