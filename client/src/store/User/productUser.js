import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

// Async Thunks
export const fetchAllActiveProducts = createAsyncThunk(
  "productUser/fetchAllActiveProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/user/allActiveProducts`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "productUser/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/user/getProductById/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSimilarProducts = createAsyncThunk(
  "productUser/fetchSimilarProducts",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/user/getSimilarProducts/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFeaturedProducts = createAsyncThunk(
  "productUser/fetchFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/user/featured-products`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchNewArrivals = createAsyncThunk(
  "productUser/fetchNewArrivals",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/user/new-arrivals`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBestSellers = createAsyncThunk(
  "productUser/fetchBestSellers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/user/best-seller`);

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTrendingProducts = createAsyncThunk(
  "productUser/fetchTrendingProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/user/trending`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "productUser/fetchCategory",
  async (category, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/user/category`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  "productUser/fetchCategoryProducts",
  async (category, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/user/category/${category}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial State
const initialState = {
  products: [],
  product: null,
  similarProducts: [],
  featuredProducts: [],
  newArrivals: [],
  bestSellers: [],
  category: [],
  categoryProducts: [],
  trending: [],
  loading: false,
  error: null,
};

// Slice
const productUserSlice = createSlice({
  name: "productUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All Active
      .addCase(fetchAllActiveProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllActiveProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload.products)
          ? action.payload.products
          : [];
      })
      .addCase(fetchAllActiveProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Single Product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product || null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Similar Products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = Array.isArray(action.payload.similarProducts)
          ? action.payload.similarProducts
          : [];
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTrendingProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.trending = action.payload;
      })
      .addCase(fetchTrendingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Featured Products
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredProducts = Array.isArray(action.payload.products)
          ? action.payload.products
          : [];
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // New Arrivals
      .addCase(fetchNewArrivals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewArrivals.fulfilled, (state, action) => {
        state.loading = false;
        state.newArrivals = Array.isArray(action.payload.products)
          ? action.payload.products
          : [];
      })
      .addCase(fetchNewArrivals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Best Sellers
      .addCase(fetchBestSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBestSellers.fulfilled, (state, action) => {
        state.loading = false;
        state.bestSellers = Array.isArray(action.payload.products)
          ? action.payload.products
          : [];
      })
      .addCase(fetchBestSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Category
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.category = action.payload ? action.payload : [];
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Category Products
      .addCase(fetchCategoryProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload ? action.payload : [];
      })
      .addCase(fetchCategoryProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productUserSlice.reducer;
