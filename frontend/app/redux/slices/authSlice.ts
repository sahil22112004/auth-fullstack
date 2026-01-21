import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogin, apiRegister, apiGoogleLogin } from '@/app/service/authApi';

interface User {
  id?: number | string;
  email: string;
  role: string;
  username?: string;
}

interface AuthState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  error: null,
  isLoggedIn: false,
};

// THUNKS
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user: any, { rejectWithValue }) => {
    try {
      return await apiLogin(user);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user: any, { rejectWithValue }) => {
    try {
      return await apiRegister(user);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (user: any, { rejectWithValue }) => {
    try {
      return await apiGoogleLogin(user);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("actionpayload",action.payload)
        state.loading = false;
        state.isLoggedIn = true;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GOOGLE LOGIN
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(googleLogin.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
