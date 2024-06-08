import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
    credentials: "include",
  }),
  tagTypes:['order'],
  endpoints: (builder) => ({
    newOrder: builder.mutation({
      query: (args) => ({
        url: "/order/new",
        method: "POST",
        body: args,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
      invalidatesTags:['order'],
    }),
    getStripeApiKey: builder.query({
      query: (keyword) => ({
        url: `/stripeapikey`,
        method: "GET",
      }),
    }),

    myOrders: builder.query({
      query: (keyword) => ({
        url: `/orders/me`,
        method: "GET",
      }),
      providesTags:['order'],
    }),

    getOrderDetails: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
        method: "GET",
      }),
      providesTags:['order'],
    }),

    getAllOrder: builder.query({
      query: () => ({
        url: `/admin/orders`,
        method: "GET",
      }),
      providesTags:['order'],
    }),

    getClientSecret: builder.mutation({
      query: (args) => ({
        url: "/payment/process",
        method: "POST",
        body: args,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
         
          return headers;
        },
      }),
    }),

    updateOrder: builder.mutation({
      query: (args) => ({
        url: `/admin/order/${args.id}`,
        method: "PUT",
        body:args.myForm ,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
         
          return headers;
        },
      }),
      invalidatesTags:['order'],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/admin/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['order'],
    }),

  }),
});

export const {useNewOrderMutation,
  useGetStripeApiKeyQuery,
  useGetClientSecretMutation,
  useMyOrdersQuery,
  useGetOrderDetailsQuery,
  useGetAllOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
