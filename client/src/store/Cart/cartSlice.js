import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (guestId, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/api/cart`, {
        params: { guestId },
        withCredentials: true,
      });
      return res.data; // should be { cart: { ... }, message? }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/api/cart`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (data, thunkAPI) => {
    try {
      const res = await axios.put(`${API}/api/cart`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (data, thunkAPI) => {
    try {
      const res = await axios.delete(`${API}/api/cart`, {
        data,
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const mergeCarts = createAsyncThunk(
  "cart/mergeCarts",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/api/cart/merge`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      products: [],
      totalPrice: 0,
    },
    loading: false,
    error: null,
    status: null, // e.g., "added", "updated", "removed", "merged"
    message: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [], totalPrice: 0 };
      state.loading = false;
      state.error = null;
      state.status = null;
      state.message = null;
    },
    clearStatusAndMessage: (state) => {
      state.status = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Cart
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart || action.payload;
        state.message = action.payload.message || null;
        state.error = null;
        state.status = "fetched";
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "error";
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart || action.payload;
        state.message = action.payload.message || "Item added to cart";
        state.status = "added";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "error";
      })

      // Update Cart
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart || action.payload;
        state.message = action.payload.message || "Cart updated";
        state.status = "updated";
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "error";
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart || action.payload;
        state.message = action.payload.message || "Item removed from cart";
        state.status = "removed";
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "error";
      })

      // Merge Carts
      .addCase(mergeCarts.pending, (state) => {
        state.loading = true;
      })
      .addCase(mergeCarts.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.cart || action.payload;
        state.message = action.payload.message || "Carts merged";
        state.status = "merged";
      })
      .addCase(mergeCarts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "error";
      });
  },
});

export const { clearCart, clearStatusAndMessage } = cartSlice.actions;
export default cartSlice.reducer;
