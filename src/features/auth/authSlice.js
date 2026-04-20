import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';
const authApi="/api/v1/auth";
const userApi="/api/v1/user"
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${authApi}/login`, credentials);
      localStorage.setItem('token', response.data.token);  // Store token in localStorage
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (updateData, { rejectWithValue }) => {
    // console.log("from data eakde ala .... ha ahe", updateUser);
    
    try {
     console.log("`${userApi}/updateMe`",`${userApi}/updateMe`);
     
      const response = await axiosInstance.patch(`${userApi}/updateMe`, updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    token: localStorage.getItem('token') || null,  
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem('token');  // Clear token from localStorage
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.token = action.payload.token;
      })    
      // Handle updateUser cases
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user; // Assuming the API response has the updated user under `data.user`
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
      ;
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
