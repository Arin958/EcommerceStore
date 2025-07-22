import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API = import.meta.env.VITE_API;

export const fetchAllUsers = createAsyncThunk(
    "userAdmin/fetchAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API}/api/userAdmin`, {
                withCredentials: true,
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    users: [],
    loading: false,
    error: null,
};

const userAdminSlice = createSlice({
    name: "userAdmin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export default userAdminSlice.reducer;