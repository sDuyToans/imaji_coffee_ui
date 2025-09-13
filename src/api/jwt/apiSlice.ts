import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/v1/auth",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

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
