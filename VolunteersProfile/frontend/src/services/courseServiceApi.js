// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getStaticURL } from './url'
const url = getStaticURL();
// Define a service using a base URL and expected endpoints
export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/` }),
    endpoints: (builder) => ({
        listAllCourse: builder.query({
            query: () => ({
                url: 'courses/',
                method: 'GET'
            }),
        }),
        getOneCourse: builder.query({
            query: (userId) => {
                console.log("id",userId)
                return {
                url: `courses/${userId}/`,
                method: 'GET'
                }
            },
        }),
        
        createCourse: builder.mutation({
            query: (user) => ({
                url: 'courses/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateCourse: builder.mutation({
            query: (user) => {
                const {id, ...data} = user
                return {
                url: `courses/${id}/`,
                method: 'PUT',
                body :data,
                headers : {
                    'Content-Type': 'application/json',
                },
                }
            },
        }),
        deleteCourse: builder.mutation({
            query: (categoryId) => {
                console.log("id",categoryId)
                return {
                url: `courses/${categoryId}/`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                }
            },
        }),






        // createPlaylist

        createPlaylist: builder.mutation({
            query: (cart) => ({
                url: 'playlists/',
                method: 'POST',
                body: cart,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updatePlaylist: builder.mutation({
            query: (cart) => {
                const {id, ...data} = cart
                return {
                url: `playlists/${id}/`,
                method: 'PUT',
                body :data,
                headers : {
                    'Content-Type': 'application/json',
                },
                }
            }
        }),
        deletePlaylist: builder.mutation({
            query: (cartId) => {
                console.log("id",cartId)
                return {
                url: `playlists/${cartId}/`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                }
            }
        }),
        listAllPlaylists: builder.query({
            query: () => ({
                url: 'playlists/',
                method: 'GET'
            }),
        }),
        getOnePlaylist: builder.query({
            query: (userId) => {
                console.log("id",userId)
                return {
                url: `playlists/${userId}/`,
                method: 'GET'
                }
            },
        }),
        
// notes




        creatnotes: builder.mutation({
            query: (cart) => ({
                url: 'notes/',
                method: 'POST',
                body: cart,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updatnotes: builder.mutation({
            query: (cart) => {
                const {id, ...data} = cart
                return {
                url: `notes/${id}/`,
                method: 'PUT',
                body :data,
                headers : {
                    'Content-Type': 'application/json',
                },
                }
            }
        }),
        deletnotes: builder.mutation({
            query: (cartId) => {
                console.log("id",cartId)
                return {
                url: `notes/${cartId}/`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                }
            }
        }),
        listAllnotes: builder.query({
            query: () => ({
                url: 'notes/',
                method: 'GET'
            }),
        }),
        getOnnotes: builder.query({
            query: (userId) => {
                console.log("id",userId)
                return {
                url: `notes/${userId}/`,
                method: 'GET'
                }
            },
        }),

        getoneAllNotes: builder.query({
            query: (userId) => {
                console.log("id",userId)
                return {
                url: `all_notes/${userId}/`,
                method: 'GET'
                }
            }
        }),

// dashboard



        createDashboard: builder.mutation({
            query: (cart) => ({
                url: 'dashboards/',
                method: 'POST',
                body: cart,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateDashboard: builder.mutation({
            query: (cart) => {
                const {id, ...data} = cart
                return {
                url: `dashboard/update/${id}/`,
                method: 'POST',
                body :data,
                headers : {
                    'Content-Type': 'application/json',
                },
                }
            }
        }),
        GetOneDashboard: builder.query({
            query: (userId) => {
                console.log("id",userId)
                return {
                url: `dashboards/${userId}/`,
                method: 'GET'
                }
            }
        }),
        getDashboardId: builder.mutation({
            query: (mail) => ({
                url: 'find_dashboard_id_by_email/',
                method: 'POST',
                body: mail,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),

        //videos
        listAllVideos: builder.query({
            query: () => ({
                url: 'videos/',
                method: 'GET'
            }),
        }),
        getOneVideo: builder.query({
            query: (userId) => {
                console.log("id",userId)
                return {
                url: `videos/${userId}/`,
                method: 'GET'
                }
            }
        }),


        //weekly monthly reports
        getUserMonthlyRep: builder.mutation({
            query: (mail) => ({
                url: 'monthly-user-progress/',
                method: 'POST',
                body: {"email":mail},
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        getUserWeeklyRep: builder.mutation({
            query: (mail) => ({
                url: 'weekly-user-progress/',
                method: 'POST',
                body: {"email":mail},
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateWeeklyUpdate: builder.mutation({
            query: (data) => {
                console.log("data",data)
                return {
                url: `update/weekly/`,
                method: 'POST',
                body :data,
                headers : {
                    'Content-Type': 'application/json',
                },
                }
            }
        }),
        updateMonthlyUpdate: builder.mutation({
            query: (data) => {
                console.log("data",data)
                return {
                url: `update/monthly/`,
                method: 'POST',
                body :data,
                headers : {
                    'Content-Type': 'application/json',
                },
                }
            }
        }),

        

    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useListAllCourseQuery, useGetOneCourseQuery, useCreateCourseMutation, useUpdateCourseMutation, useDeleteCourseMutation, useCreatePlaylistMutation, useUpdatePlaylistMutation, useDeletePlaylistMutation, useListAllPlaylistsQuery, useGetOnePlaylistQuery, useCreatnotesMutation, useUpdatnotesMutation, useDeletnotesMutation, useListAllnotesQuery, useGetOnnotesQuery , useGetoneAllNotesQuery , useCreateDashboardMutation, useUpdateDashboardMutation, useGetOneDashboardQuery , useGetDashboardIdMutation , useListAllVideosQuery, useGetOneVideoQuery,useGetUserMonthlyRepMutation,useGetUserWeeklyRepMutation,useUpdateWeeklyUpdateMutation,useUpdateMonthlyUpdateMutation} = cartApi