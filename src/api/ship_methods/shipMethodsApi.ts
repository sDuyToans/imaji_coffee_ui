import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ShippingMethodItem } from "@/types";

export const shipMethodsApi = createApi({
  reducerPath: "shipMethodsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
  }),
  endpoints: (builder) => ({
    getShipMethods: builder.query<ShippingMethodItem[], void>({
      query: () => "/ship-methods",
    }),
  }),
});

export const { useGetShipMethodsQuery } = shipMethodsApi;
