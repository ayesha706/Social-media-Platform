import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {jwtDecode} from 'jwt-decode';

const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
      return decodedToken.user;
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  return null;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/posts',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token') || '';
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Post', 'Comment'], 
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => '/all-posts',
      providesTags: ['Post'], 
    }),
    addComment: builder.mutation({
      query: ({ postId, text }) => ({
        url: '/addcomment',
        method: 'POST',
        body: {
          postId,
          text,
          userId: getUserIdFromToken(),
        },
      }),
      invalidatesTags: ['Post'], 
    }),
    likePost: builder.mutation({
      query: ({ postId }) => ({
        url: `/likepost/${postId}`,
        method: 'PUT',
        body: {
          userId: getUserIdFromToken(),
        },
      }),
      invalidatesTags: ['Post'], 
    }),
  }),
});

export const { useGetAllPostsQuery, useAddCommentMutation, useLikePostMutation } = apiSlice;
