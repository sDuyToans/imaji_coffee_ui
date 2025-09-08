import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { PromosProduct } from "@/types";

export const promosApi = createApi({
  reducerPath: "promosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
  }),
  endpoints: (builder) => ({
    getPromos: builder.query<PromosProduct, { productId: number }>({
      query: ({ productId }) => `/${productId}/promos`,
    }),
  }),
});

export const { useGetPromosQuery } = promosApi;
