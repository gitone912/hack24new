// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getStaticURL } from './url'
const url = getStaticURL();
// Define a service using a base URL and expected endpoints
export const userAccountApi = createApi({
    reducerPath: 'userAccountApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/account/` }),
    endpoints: (builder) => ({
        CreateAccountProfile: builder.mutation({
            query: (user) => ({
                url: 'userprofiles/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        GetAccountProfile: builder.mutation({
            query: (user) => ({
                url: 'getuserprofile/',
                method: 'POST',
                body: {email: user},
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        UpdateAccountProfile: builder.mutation({
            query: (user) => ({
                url: 'update-profile/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        
        GetPosts: builder.query({
            query: (categoryId) => {
                console.log("id",categoryId)
                return {
                url: `posts/${categoryId}/`,
                method: 'GET'
                }
            },
        }),

        CreatePost: builder.mutation({
            query: (post) => ({
                url: 'createpost/',
                method: 'POST',
                body: post,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        GetMyPosts: builder.mutation({
            query: (user) => ({
                url: 'myposts/',
                method: 'POST',
                body: {email: user},
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        GetAllPosts: builder.query({
            query: () => ({
                url: 'posts/',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),



    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateAccountProfileMutation, useGetAccountProfileMutation, useGetPostsQuery, useCreatePostMutation ,useGetMyPostsMutation ,useGetAllPostsQuery ,useUpdateAccountProfileMutation} = userAccountApi