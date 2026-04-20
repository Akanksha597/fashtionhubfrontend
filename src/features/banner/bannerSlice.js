import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

const bannerApi = "/api/v1/banner";

// Async thunks
export const fetchAllBanners = createAsyncThunk(
  'banner/fetchAllBanners',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(bannerApi, {
        params: { page, limit },
      });
      return response.data; // Adjusting response based on your structure
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bannerSlice = createSlice({
  name: 'banner',
  initialState: {
    banners: [],
    total: 0,
    loading: false,
    error: null,
  },
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.data.banners; // Corrected the path
        state.total = action.payload.total;
      })
      .addCase(fetchAllBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = bannerSlice.actions;
export default bannerSlice.reducer;
