import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import {api} from "../../services/api.ts";

interface AuthState {
    accessToken: string | null;
    AdminAccess_token:string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isAdminAuthenticated: boolean;
    loading: boolean;
    balance:string
    User: User[]
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('access_token') ?? "",
    AdminAccess_token:localStorage.getItem('AdminAccess_token') ?? "",
    refreshToken: localStorage.getItem('refresh_token') ?? "",
    isAuthenticated: Boolean(localStorage.getItem('access_token')),
    isAdminAuthenticated:Boolean(localStorage.getItem('AdminAccess_token')),
    loading: false,
    balance:"",
    User: []
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
        builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
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
            .addMatcher(api.endpoints.register.matchFulfilled, (state) => {
                state.loading = false;
                return state;
            })
            .addMatcher(api.endpoints.adminLogin.matchFulfilled, (state,action) => {
                const data = action.payload.data;
                state.loading = false;
                localStorage.setItem("AdminAccess_token", data.token);
                state.accessToken = data.token;
                state.isAdminAuthenticated = true;
                return state;
            })
            .addMatcher(api.endpoints.register.matchRejected, (state) => {
                state.loading = false;
                return state;
            })
            .addMatcher(api.endpoints.getBalance.matchFulfilled, (state, action) => {
                const data = action.payload.data;
                state.balance = data.balance;
                state.loading = false;
                return state;
            })
            .addMatcher(api.endpoints.getUserByNumber.matchFulfilled, (state,action) => {
                state.User = action.payload.data;
                state.loading = false;
                return state;
            })
        //Todo:Make New Wallet Slice
            .addMatcher(api.endpoints.sendMoney.matchFulfilled, (state) => {
                state.loading = false;
                return state;
            })
            .addMatcher(api.endpoints.addFund.matchFulfilled, (state) => {
                state.loading = false;
                return state;
            })
    }
})