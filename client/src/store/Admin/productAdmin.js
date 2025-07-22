import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const API = import.meta.env.VITE_API;

export const fetchAllProductsAdmin = createAsyncThunk(
  "productAdmin/fetchAllProductsAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/admin/`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "productAdmin/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/api/admin/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "productAdmin/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API}/api/admin/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "productAdmin/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API}/api/admin/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const productAdminSlice = createSlice({
  name: "productAdmin",
  initialState: {
    products: [],
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductsAdmin.fulfilled, (state, action) => {
        state.loading = false;
         state.products = Array.isArray(action.payload.products)
    ? action.payload.products
    : [];
      })
      .addCase(fetchAllProductsAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;

        // SAFETY CHECK: Make sure products is an array
        if (!Array.isArray(state.products)) {
          console.warn(
            "Fixing products: Expected array but got:",
            state.products
          );
          state.products = [];
        }

        state.products.push(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (p) => p._id !== action.payload.deletedProduct._id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.map((p) =>
          p._id === action.payload.product._id ? action.payload.product : p
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productAdminSlice.reducer;
