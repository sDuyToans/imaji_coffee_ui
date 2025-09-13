import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1/auth" }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string },
      { loginInput: string; password: string }
    >({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      transformErrorResponse: (response: { status: number; data: any }) => {
        return response.data;
      },
    }),
    signup: builder.mutation<
      { token: string },
      { email: string; username: string; password: string }
    >({
      query: (body) => ({
        url: "/signup",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
