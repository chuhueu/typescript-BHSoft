import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../axios";
export const login = createAsyncThunk("users/login" ,async (user: object) => {
    const res = await axios.post("/auth/login", user);
    return res.data;
})

interface userSate {
    userInfo: object | null;
    isFetching: boolean;
    error: boolean;
}

const initialState: userSate = {
    userInfo: JSON.parse(localStorage.getItem("user") || '{}') || null,
    isFetching: true,
    error: false
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        logout: (state) => {
            state.userInfo = null;
            state.isFetching = true;
            state.error = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isFetching = true;
                state.error = false;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<object>) => {
                state.userInfo = action.payload;
                state.isFetching = true;
            })
            .addCase(login.rejected, (state) => {
                state.isFetching = false;
                state.error = true;
            })
    }
})

export const {logout} = userSlice.actions;
export default userSlice.reducer;
