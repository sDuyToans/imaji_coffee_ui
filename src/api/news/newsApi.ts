import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { NewItem } from "@/types";

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
  }),
  endpoints: (builder) => ({
    getNews: builder.query<NewItem[], void>({
      query: () => "/news",
    }),
  }),
});

export const { useGetNewsQuery } = newsApi;
