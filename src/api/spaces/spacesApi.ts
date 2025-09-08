import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { SliderItem } from "@/types";

export const spacesApi = createApi({
  reducerPath: "spacesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/spaces",
  }),
  endpoints: (builder) => ({
    getSpaces: builder.query<SliderItem[], void>({
      query: () => "",
    }),
  }),
});

export const { useGetSpacesQuery } = spacesApi;
