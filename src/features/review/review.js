import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosInstance";

const API_URL = "/api/v1/review";

// Thunks
export const fetchReviewsForProduct = createAsyncThunk(
  "reviews/fetchReviewsForProduct",
  async (productId, { rejectWithValue }) => {
    try {
        console.log("this is product id in slice" , productId)
      const response = await axios.get(`${API_URL}/product/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchReviewsByUser = createAsyncThunk(
  "reviews/fetchReviewsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateReviewContent = createAsyncThunk(
  "reviews/updateReviewContent",
  async ({ reviewId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${reviewId}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${reviewId}`);
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsForProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewsForProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsForProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload.review);
      })
      .addCase(updateReviewContent.fulfilled, (state, action) => {
        const index = state.reviews.findIndex(
          (review) => review._id === action.payload.review._id
        );
        if (index !== -1) {
          state.reviews[index] = action.payload.review;
        }
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      });
  },
});

export default reviewsSlice.reducer;
