import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store/store.ts";

const baseUrl = "http://localhost:5000/api";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.accessToken;
            const adminToken = (getState() as RootState).auth.AdminAccess_token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            if (adminToken) {
                headers.set("Authorization", `Bearer ${adminToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<ApiResponse<{ token: string; refreshToken: string }>, {
            email: string;
            password: string
        }>({
            query: (body) => ({url: "/user/login", method: "POST", body}),
        }),
        adminLogin: builder.mutation<ApiResponse<{ token: string; refreshToken: string }>, {
            email: string;
            password: string
        }>({
            query: (body) => ({url: "/user/adminLogin", method: "POST", body}),
        }),
        register: builder.mutation<ApiResponse<User>, Omit<User, "_id" | "confirmPassword">>({
            query: (body) => ({url: "/user/register", method: "POST", body}),
        }),
        getPendingTransferTransaction: builder.query<ApiResponse<Transaction>, void>({
            query: () => "/user/getPendingTransactions"
        }),
        getPendingFundTransaction: builder.query<ApiResponse<Transaction>, void>({
            query: () => "/user/getPendingFundTransactions"
        }),
        getBalance: builder.query<ApiResponse<Wallet>, void>({
            query: () => "/wallet/getBalance",
        }),
        getUserByNumber: builder.query<ApiResponse<User>, string>({
            query: (phone) => `/user/getUserByPhone/${phone}`,
        }),

        sendMoney: builder.mutation<ApiResponse<void>, { amount: number; receiverId: string }>({
            query: (body) => ({url: "/wallet/transferFund", method: "POST", body}),
        }),
        addFund: builder.mutation<ApiResponse<void>, { amount: number }>({
            query: (body) => ({url: '/wallet/addfund', method: "POST", body})
        }),
        withdrawFund: builder.mutation<ApiResponse<void>, { amount: Number }>({
            query: (body) => ({url: '/user/withdrawal', method: "POST", body})
        }),
        approveTransferFund: builder.mutation<ApiResponse<void>, string>({
            query: (transactionId) => ({url: `/user/approveTransfer/${transactionId}`, method: "POST"})
        }),
        approveFunding: builder.mutation<ApiResponse<void>, string>({
            query: (transactionId) => ({url: `/user/approveFund/${transactionId}`, method: "POST"})
        })
}),
})
;

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetBalanceQuery,
    useGetUserByNumberQuery,
    useSendMoneyMutation,
    useAddFundMutation,
    useWithdrawFundMutation,
    useAdminLoginMutation,
    useGetPendingTransferTransactionQuery,
    useGetPendingFundTransactionQuery,
    useApproveTransferFundMutation,
    useApproveFundingMutation
} = api;
