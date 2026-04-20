import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
const productApi = "/api/v1/products";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params={}, { rejectWithValue }) => {
    try {
      const {
        keyword="",
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
        status = "true", 
      } = params;
     const queryParams = {
        keyword,
        minPrice,
        maxPrice,
        page,
        limit,
        status,
      };
       console.log("keyword :::",keyword);
      
        Object.keys(queryParams).forEach((key) =>
        queryParams[key] === undefined || queryParams[key] === null
          ? delete queryParams[key]
          : {}
      );
      console.log("queryParams :::",queryParams);
      const response = await axiosInstance.get(productApi, {
        params: queryParams,
      });

      console.log("Product list response:", response);
    return {
      products: response.data.products,
      pagination: response.data.pagination,
    };
    } catch (error) {

      console.log("this is error :::",error.message);
     return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTraindingProduct = createAsyncThunk(
  "product/fetchTraindingProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${productApi}/productSale`);
  
      const products = response.data.products.map(item => item.productDetails);
      return products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${productApi}/${productId}`);
      return response.data.data.product;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch products with offer filters & pagination
export const fetchOfferProduct = createAsyncThunk(
  "product/fetchOfferProduct",
  async ({ page = 1, limit = 20, offerZone, todayOffer }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${productApi}/productOffer`, {
        params: { page, limit, offerZone, todayOffer },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    offerProducts: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(fetchTraindingProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(fetchTraindingProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      }).addCase(fetchTraindingProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(fetchOfferProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOfferProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.offerProducts = action.payload.data.products;
        state.total = action.payload.data.total;
        state.totalPages = action.payload.data.totalPages;
        state.currentPage = action.payload.data.page;
      })
      .addCase(fetchOfferProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default productSlice.reducer;
