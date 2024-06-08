import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
    credentials: "include",
  }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (keyword) => ({
        url: `/products`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    getAllProducts: builder.query({
      query: (args) => {
        if (args.keyword) {
          return {
            url: `/products?keyword=${args.keyword}&page=${args.page}
            &price[gte]=${args.price[0]}
            &price[lte]=${args.price[1]}
            `,
            method: "GET",
          };
        } else if (args.category) {
          return {
            url: `/products?page=${args.page}&price[gte]=${args.price[0]}
            &price[lte]=${args.price[1]}&category=${args.category}&ratings=${args.ratings}
            ` /*    */,
            method: "GET",
            /* providesTags:['product'], */
          };
        } else if (args.ratings) {
          return {
            url: `/products?page=${args.page}&price[gte]=${args.price[0]}
            &price[lte]=${args.price[1]}&ratings=${args.ratings}
            ` /*    */,
            method: "GET",
            /* providesTags:['product'], */
          };
        } else {
          return {
            url: `/products?page=${args.page}&price[gte]=${args.price[0]}
            &price[lte]=${args.price[1]}
            ` /*    */,
            method: "GET",
            /* providesTags:['product'], */
          };
        }
      },
      providesTags: ["product"],
    }),

    getAdminProduct: builder.query({
      query: () => ({
        url: `/admin/products`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),

    /* avabe amra route perams er value dita pari.zodi route 
          a kono value na thake tale all product ashbe ar value
          thakle search hoye product ashbe */

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/product/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["product"],
    }),

    getProductById: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
        method: "GET",
        /*  providesTags:['product'], */
      }),
      providesTags: ["product"],
    }),

    createReview: builder.mutation({
      query: ({ myForm }) => ({
        url: "/review",
        method: "PUT",
        body: myForm,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: (args) => ({
        url: `/admin/product/${args.id}`,
        method: "PUT",
        body: args.myForm,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
      invalidatesTags: ["product"],
    }),
    createProduct: builder.mutation({
      query: (args) => ({
        url: "/admin/product/new",
        method: "POST",
        body: args,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useDeletePostMutation,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useCreateReviewMutation,
  useGetAdminProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
} = productApi;
