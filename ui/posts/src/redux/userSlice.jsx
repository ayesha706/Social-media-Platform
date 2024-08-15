import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token') || '';
      if (token) {
        headers.set('Authorization', `${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: info => ({
        url: "/login",
        method: "POST",
        body: info,
      })
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user,
      })
    }),

  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
} = userSlice;