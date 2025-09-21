import { apiSlice } from "@/api/jwt/apiSlice.ts";
import { AddressResponseDto } from "@/types";

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAccount: build.query({
      query: () => "/account",
    }),
    validateToken: build.query({
      query: () => "/validate",
    }),
    getAccountOrders: build.query<void, void>({
      query: () => "/account/orders",
    }),
    getAddresses: build.query<AddressResponseDto[], void>({
      query: () => "/account/address",
    }),
  }),
});

export const {
  useGetAccountQuery,
  useValidateTokenQuery,
  useGetAccountOrdersQuery,
  useGetAddressesQuery,
} = accountApi;
