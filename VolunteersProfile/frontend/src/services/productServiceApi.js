// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getStaticURL } from './url'
const url = getStaticURL();
// Define a service using a base URL and expected endpoints
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${url}/products` }),
    endpoints: (builder) => ({
        listProductCategories: builder.query({
            query: () => ({
                url: 'category/',
                method: 'GET'
            }),
        }),
        singleProductCategory: builder.query({
            query: (categoryId) => {
                console.log("id",categoryId)
                return {
                url: `category/${categoryId}/`,
                method: 'GET'
                }
            },
        }),
        
        createProductCategory: builder.mutation({
            query: (user) => ({
                url: 'category/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateProductCategory: builder.mutation({
            query: (user) => {
                const {id, ...data} = user
                return {
                url: `category/${id}/`,
                method: 'PUT',
                body :data,
                headers : {
                    'Content-Type': 'application/json',
                },
                }
            },
        }),
        deleteProductCategory: builder.mutation({
            query: (categoryId) => {
                console.log("id",categoryId)
                return {
                url: `category/${categoryId}/`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                }
            },
        }),
        listProducts : builder.query({
            query: () => ({
                url: 'product/',
                method: 'GET'
            }),
        }),
        getSingleProduct : builder.query({
            query: (productId) => {
                console.log("id",productId)
                return {
                url: `product/${productId}/`,
                method: 'GET'
                }
            }
        }),
        createProduct : builder.mutation({
            query: (user) => ({
                url: 'product/',
                method: 'POST',
                body: user,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        updateProduct : builder.mutation({
            query: (user) => {
                const {id, ...data} = user
                return {
                url: `product/${id}/`,
                method: 'PUT',
                body :data,
                headers : {
                    'Content-Type': 'application/json',
                },
                }
            }
        }),

        deleteProduct : builder.mutation({
            query: (productId) => {
                console.log("id",productId)
                return {
                url: `product/${productId}/`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                }
            }
        }),

    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useListProductCategoriesQuery,useSingleProductCategoryQuery,useCreateProductCategoryMutation,useUpdateProductCategoryMutation,useDeleteProductCategoryMutation , useListProductsQuery , useCreateProductMutation ,useGetSingleProductQuery ,useUpdateProductMutation , useDeleteProductMutation } = productApi