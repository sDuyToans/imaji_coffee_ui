import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1/payment",
  }),
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      { clientSecret: string },
      { amount: number; currency: string }
    >({
      query: (body) => ({
        url: "/create-payment-intent",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = paymentApi;
