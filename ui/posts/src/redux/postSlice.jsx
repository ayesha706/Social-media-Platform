import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { jwtDecode } from 'jwt-decode';

const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    //   console.log("======token====", token);
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            //   console.log('Decoded Token:', decodedToken);
            return decodedToken.user;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
    return null;
};

export const apiSlice = createApi({
    reducerPath: 'posts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/posts',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token') || '';
            if (token) {
                headers.set('Authorization', ` ${token}`);
                // console.log("tokentokentoken", token);
                // console.log("hedershedersheders", headers);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllPosts: builder.query({
            query: () => '/all-posts',
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
        }),
        likePost: builder.mutation({
            query: ({ postId }) => ({
                url: `/likepost/${postId}`,
                method: 'PUT',
                body: {
                    userId: getUserIdFromToken(),
                },
            }),
        }),
        makePost: builder.mutation({
            query: (data) => ({
              url: `/create-post/${data.userId}`,
              method: 'POST',
              body: data,
            }),
          }),
    }),
});

export const { useGetAllPostsQuery, useAddCommentMutation, useLikePostMutation, useMakePostMutation } = apiSlice;
