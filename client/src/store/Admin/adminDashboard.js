import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const fetchAdminDashboardData = createAsyncThunk(
  "adminDashboard/fetchAdminDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/adminDashboard`, {
        withCredentials: true,
      });
    
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  adminDashboardData: {},
  isLoading: false,
  isError: false,
};

const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDashboardData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchAdminDashboardData.fulfilled, (state, action) => {
       
        state.adminDashboardData = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAdminDashboardData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default adminDashboardSlice.reducer;
