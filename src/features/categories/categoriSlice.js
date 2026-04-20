import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const categoriesApi = "/api/v1/categories";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async ({ page = 1, limit = 10, keyword = "" }, { rejectWithValue }) => {
    try {
      const params = { page, limit, keyword };
      const response = await axiosInstance.get(categoriesApi, { params });

      console.log("API Response:", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Error fetching categories"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    totalCategories: 0,
    totalPages: 0,
    currentPage: 1,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = action.payload?.data || [];
        state.totalCategories = action.payload?.results || 0;
        state.totalPages = 1;
        state.currentPage = 1;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;