import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { RootState } from "@/store/store.ts";

const apiURL = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: apiURL,
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
