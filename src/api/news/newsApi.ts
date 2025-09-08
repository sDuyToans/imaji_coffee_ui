import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { NewItem } from "@/types";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/news",
  }),
  endpoints: (builder) => ({
    getNews: builder.query<NewItem[], void>({
      query: () => "",
    }),
    getNewById: builder.query<NewItem, string | number>({
      query: (newId) => `/${newId}`,
    }),
  }),
});

export const { useGetNewsQuery, useGetNewByIdQuery } = newsApi;
