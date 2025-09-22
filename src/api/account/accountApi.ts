import { apiSlice } from "@/api/jwt/apiSlice.ts";
import { AddressResponseDto } from "@/types";

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAccountOrders: build.query<void, void>({
      query: () => "/account/orders",
    }),
    getAddresses: build.query<AddressResponseDto[], void>({
      query: () => "/account/address",
    }),
    getUserInfo: build.query<void, void>({
      query: () => "/account/user",
    }),
  }),
});

export const {
  useGetAccountOrdersQuery,
  useGetAddressesQuery,
  useGetUserInfoQuery,
} = accountApi;
