import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { EventItem } from "@/types";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/events",
  }),
  endpoints: (builder) => ({
    getUpComingEvent: builder.query<EventItem[], void>({
      query: () => "/upcoming",
      keepUnusedDataFor: 300, // cache for 5 minutes
    }),
    getClosedEvent: builder.query<EventItem[], void>({
      query: () => "/closed",
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetUpComingEventQuery, useGetClosedEventQuery } = eventsApi;
