import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const fetchNotification = createAsyncThunk(
  "notification/fetchNotification",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/notification`, {
        withCredentials: true,
      });
      return res.data.notifications;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// In your notificationSlice.js or similar
export const markAllNotificationsAsRead = createAsyncThunk(
  "notification/markAllAsRead",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API}/api/notification/mark-all-as-read`,
        { userId },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.notifications = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state, action) => {
        // Mark all notifications as read in the state
        state.notifications = state.notifications.map((notification) => ({
          ...notification,
          read: true,
        }));
      });
  },
});


export const { clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
