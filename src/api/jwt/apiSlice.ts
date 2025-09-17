import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "@/store/store.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});

export const apiCartSlice = createApi({
  reducerPath: "apiCart",
  baseQuery,
  tagTypes: ["Cart"],
  endpoints: () => ({}),
});
