import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "../store/store.ts";

const baseUrl = "http://localhost:5000/api";


export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<ApiResponse<{ token: string, refreshToken: string }>, {
            email: string,
            password: string
        }>({
            query: (body) => {
                return {url: '/user/login', method: 'POST', body}
            },
        }),
        register: builder.mutation<ApiResponse<User>, Omit<User, '_id'  | 'confirmPassword'>>({
            query: (body) => {
                return { url: '/user/register', method: 'POST', body };
            },
        })
})
})
export const {useLoginMutation, useRegisterMutation} = api;
