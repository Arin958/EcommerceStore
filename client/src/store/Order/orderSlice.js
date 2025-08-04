import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/order`, {
        withCredentials: true,
      });
      return res.data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrderDetails = createAsyncThunk(
  "order/fetchOrderDetails",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/order/${orderId}`, {
        withCredentials: true,
      });
      return res.data.order;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const initialState = {
  orders: [],
  order: null,
  error: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        console.log(action.payload);
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      })
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
      });
  }
});


export default orderSlice.reducer;