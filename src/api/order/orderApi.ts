import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiURL = import.meta.env.VITE_API_BASE_URL;

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiURL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/order",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),
    createOrderForPayPal: builder.mutation({
      query: (orderData) => ({
        url: "/order/paypal",
        method: "POST",
        body: orderData,
      }),
    }),
    getOrderById: builder.query({
      query: (orderId) => `/order/${orderId}`,
      providesTags: ["Orders"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/order/${orderId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useCreateOrderForPayPalMutation,
} = orderApi;
