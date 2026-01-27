import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogin, apiRegister, apiGoogleLogin } from '@/app/service/authApi';
import { current } from "@reduxjs/toolkit";

export interface User {
  id?: number | string;
  email: string;
  role: string;
  username?: string;
}

interface AuthState {
  currentUser: User | null;
  cart:any;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  cart:[],
  loading: false,
  error: null,
  isLoggedIn: false,
};

export const loginUser = createAsyncThunk(
  'loginUser',
  async (user: any, { rejectWithValue }) => {
    try {
      return await apiLogin(user);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'registerUser',
  async (user: any, { rejectWithValue }) => {
    try {
      console.log("working")
      return await apiRegister(user);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const googleLogin = createAsyncThunk(
  'googleLogin',
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
    },
    addToCart: (state, action) => {
      console.log('working')
      console.log("payload ",action.payload)
      console.log("state:", current(state))
      console.log("CART BEFORE:", state.cart)
      const product = action.payload;
      const existingItem = state.cart?.find((item: any) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart?.push({...product, quantity: 1});
      }
      console.log("CART AFTER:", state.cart);
    },

    incrementQuantity: (state, action) => {
      const item = state.cart?.find((item: any) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cart?.find((item: any) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cart = state.cart?.filter((x: any) => x.id !== action.payload);
        }
      }
    },

    clearCart :(state)=>{
      state.cart=[]
    }

  },
  extraReducers: (builder) => {
    builder
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

      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.currentUser = action.payload.user;
        state.error = null;
      })
      .addCase(googleLogin.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, addToCart, incrementQuantity, decrementQuantity,clearCart } = authSlice.actions;
export default authSlice.reducer;
