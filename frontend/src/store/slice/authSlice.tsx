import type { PayloadAction} from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {api} from "../../services/api.ts";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('access_token') ?? "",
    refreshToken: localStorage.getItem('refresh_token') ?? "",
    isAuthenticated: Boolean(localStorage.getItem('access_token')),
    loading: false,
}

export const authSlice = createSlice({
    name: "auht",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<{loading: boolean}>) => {
            state.loading = action.payload.loading;
        },
        setTokens: (
            state,
            action: PayloadAction<{ accessToken: string; refreshToken: string }>
        ) => {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
        },
        resetTokens: (state) => {
            state.accessToken = "";
            state.refreshToken = "";
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(api.endpoints.login.matchPending, (state) => {
            state.loading = true;
            return state;
        })
            .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
                const data = action.payload.data;
                console.log(data);
                state.loading = false;
                localStorage.setItem("access_token", data.token);
                localStorage.setItem("refresh_token", data.refreshToken);
                state.accessToken = data.token;
                state.refreshToken = data.refreshToken;
                state.isAuthenticated = true;
                return state;
            })
            .addMatcher(api.endpoints.login.matchRejected, (state) => {
                state.loading = false;
                return state;
            })
            .addMatcher(api.endpoints.register.matchPending, (state) => {
                state.loading = true;
                return state;
            })
            .addMatcher(api.endpoints.register.matchFulfilled, (state) => {
                state.loading = false;
                return state;
            })
            .addMatcher(api.endpoints.register.matchRejected, (state) => {
                state.loading = false;
                return state;
            });
    }
})