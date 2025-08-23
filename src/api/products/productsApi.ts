import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ProductItem } from "@/types";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductItem[], void>({
      query: () => "/products",
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
