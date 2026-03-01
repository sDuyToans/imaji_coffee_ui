import { apiSlice } from "@/api/jwt/apiSlice.ts";
import { AddressResponseDto, UserInfo } from "@/types";

export const accountApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAccountOrders: build.query<void, void>({
      query: () => "/account/orders",
      providesTags: ["Orders"],
    }),
    getAddresses: build.query<AddressResponseDto[], void>({
      query: () => "/account/address",
    }),
    getUserInfo: build.query<void, void>({
      query: () => "/account/user",
    }),
    getMe: build.query<UserInfo, void>({
      query: () => "/account/me",
    }),
  }),
});

export const {
  useGetAccountOrdersQuery,
  useGetAddressesQuery,
  useGetUserInfoQuery,
  useGetMeQuery,
  useLazyGetMeQuery,
} = accountApi;
