import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

// ────────────────────────────────────────────────────────────────────────────────
// Async Thunks

export const fetchCheckoutItems = createAsyncThunk(
  "checkout/fetchCheckoutItems",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/checkout`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createCheckOut = createAsyncThunk(
  "checkout/createCheckOut",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/api/checkout`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const finalizeCheckout = createAsyncThunk(
  "checkout/finalizeCheckout",
  async (checkoutId, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${API}/api/checkout/${checkoutId}/finalize`,
        {},
        { withCredentials: true }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPayPalOrder = createAsyncThunk(
  "checkout/createPayPalOrder",
  async (checkoutData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/api/checkout`,
        { ...checkoutData, paymentMethod: "PayPal" },
        { withCredentials: true }
      );
      return res.data; // Expecting { paypalOrderId, checkoutData }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const capturePayPalOrder = createAsyncThunk(
  "checkout/capturePayPalOrder",
  async (orderData, { rejectWithValue }) => {
    try {
// Get token from Redux store
      
      const response = await axios.post(
        `${API}/api/checkout/capture-paypal`,
        orderData, // Send the complete object
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );
      
      console.log("✅ PayPal capture success:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ PayPal capture failed:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || { message: "Payment failed" });
    }
  }
);

// ────────────────────────────────────────────────────────────────────────────────
// State + Slice

const initialState = {
  checkout: null,
  order: null,
  loading: false,
  error: null,
  finalized: false,
  paypalOrderId: null,
  isProcessingPayPal: false,
  paypalError: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    clearCheckout: (state) => {
      state.checkout = null;
      state.order = null;
      state.error = null;
      state.finalized = false;
      state.paypalOrderId = null;
      state.paypalError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Checkout
      .addCase(fetchCheckoutItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCheckoutItems.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
      })
      .addCase(fetchCheckoutItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Normal Checkout (Cash on Delivery)
      .addCase(createCheckOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckOut.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload.checkout;
      })
      .addCase(createCheckOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Finalize Checkout
      .addCase(finalizeCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(finalizeCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
        state.finalized = true;
        state.checkout = null;
      })
      .addCase(finalizeCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // PayPal Order Create
      .addCase(createPayPalOrder.pending, (state) => {
        state.isProcessingPayPal = true;
        state.paypalError = null;
      })
      .addCase(createPayPalOrder.fulfilled, (state, action) => {
        state.isProcessingPayPal = false;
        state.paypalOrderId = action.payload.paypalOrderId;
        state.checkout = action.payload.checkoutData;
      })
      .addCase(createPayPalOrder.rejected, (state, action) => {
        state.isProcessingPayPal = false;
        state.paypalError = action.payload;
      })

      // PayPal Order Capture
      .addCase(capturePayPalOrder.pending, (state) => {
        state.loading = true;
        state.paypalError = null;
      })
      .addCase(capturePayPalOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload.checkout;
      })
      .addCase(capturePayPalOrder.rejected, (state, action) => {
        state.loading = false;
        state.paypalError = action.payload;
      });
  },
});

export const { clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
