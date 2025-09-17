import { apiSlice } from "@/api/jwt/apiSlice.ts";

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAccount: build.query({
      query: () => "/account",
    }),
    validateToken: build.query({
      query: () => "/validate",
    }),
    getAccountOrders: build.query({
      query: () => "/account/orders",
    }),
  }),
});

export const {
  useGetAccountQuery,
  useValidateTokenQuery,
  useGetAccountOrdersQuery,
} = accountApi;
