import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1",
    credentials: "include",
  }),
  tagTypes:['user'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (args) => ({
        url: "/login",
        method: "POST",
        body: args,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
      invalidatesTags:['user'],
    }),

    register: builder.mutation({
      query: (args) => ({
        url: "/register",
        method: "POST",
        body: args,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
      invalidatesTags:['user'],
    }),

    loadUser: builder.query({
      query: () => ({
        url: `/me`,
        method: "GET",
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
      providesTags:['user'],
    }),

    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "DELETE",
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
      invalidatesTags:['user'],
    }),

    updateProfile: builder.mutation({
      query: ({myForm}) => ({
        url: "/me/update",
        method: "PUT",
        body: myForm,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
      invalidatesTags:['user'],
    }),
    
   updatePassword : builder.mutation({
      query: (args) => ({
        url: `/password/update`,
        method: "PUT",
        body:args ,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
      invalidatesTags:['user'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['user'],
    }),

    allUser: builder.query({
      query: () => ({
        url: `/admin/users`,
        method: "GET",
      }),
      providesTags:['user'],
    }),

    userDetails: builder.query({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "GET",
      }),
      providesTags:['user'],
    }),

    updateUserRole: builder.mutation({
      query: (args) => ({
        url: `/admin/user/${args.id}`,
        method: "PUT",
        body: args.myForm,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
      invalidatesTags:['user'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLoadUserQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useLogoutMutation,
  useDeleteUserMutation,
  useAllUserQuery,
  useUserDetailsQuery,
  useUpdateUserRoleMutation,
} = userApi;
