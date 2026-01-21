import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {login} from '../../service/authApi'


interface currentUser {
  id:string,
  userName:string,
  email:string,
  password:string
}

interface productState {
  currentUser: currentUser|null;
  loading: boolean;
  isLoggedIn:boolean
  error: string | null;
}

const initialState: productState = {
  currentUser:null,
  loading: false,
  isLoggedIn:false,
  error: null,
};
export const loginUser = createAsyncThunk("loginUser", async (user: any,{ rejectWithValue }) => {
    try {
      console.log("thunk",user)
      const User = await login(user);
      console.log(User)
      return  User;

    } catch (error: any) {
        console.log("error",error)
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    handleLogout (state){
      state.currentUser=null
    }

    },
    extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isLoggedIn= false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {

      
        console.log('fulfilled',action.payload)
        state.loading = false;
        state.isLoggedIn = true;
        state.currentUser = action.payload;
       
        })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("reject")
        state.loading = false;
        state.isLoggedIn= false;
        state.error = action.payload as string;
        state.currentUser = null;
      });
  },
    
  },
)

export const { handleLogout }  = authSlice.actions
export default authSlice.reducer