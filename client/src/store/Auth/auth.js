import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

const generateGuestId = () => {
  const storeId = localStorage.getItem("guestId");
  if (storeId) return storeId;

  const newId = crypto.randomUUID();
  localStorage.setItem("guestId", newId);
  return newId;
};

const initialState = {
  user: null,
  loading: null,
  error: null,
  isAuthenticated: false,
  success: null,
  message: null,
  guestId: generateGuestId(),
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/api/auth/signup`, userData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json", // Changed from multipart/form-data
        },
      });

      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/api/auth/login`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (code, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/api/auth/verify`,
        { code },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/auth/check`, {
        withCredentials: true,
      });

      return res.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/api/auth/forgot-password`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API}/api/auth/reset-password`,
        { token, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API}/api/auth/logout`, {
        withCredentials: true,
      });
      return res.data.message;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.success = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload;

        const newGuestId = crypto.randomUUID();
        state.guestId = newGuestId;
        localStorage.setItem("guestId", newGuestId);
      })

      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
