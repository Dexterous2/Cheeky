import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/Config";

const productSlice = createApi({
    reducerPath: "product",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ["addProducts", "deleteProduct", "updateProduct"],
    endpoints: (builder) => ({

        getProducts: builder.query({
            query: ({ userID }) => {
                return {
                    url: `/api/products/get-products/${userID}`,
                    method: "GET",
                };
            },
            providesTags: ["addProducts", "deleteProduct"],
        }),


        getSingleProducts: builder.query({
            query: ({ userID, productID }) => {
                return {
                    url: `/api/products/${userID}/get-single-product/${productID}`,
                    method: "GET",
                };
            },
            providesTags: ["updateProduct"]
        }),

        addSingleProduct: builder.mutation({
            query: ({ userID, data }) => {
                return {
                    url: `/api/products/create-product/${userID}`,
                    method: "POST",
                    body: data
                };
            },
            invalidatesTags: ["addProducts"],
        }),

        deleteProduct: builder.mutation({
            query: ({ productID, userID }) => {
                return {
                    url: `/api/products/${userID}/delete-product/${productID}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["deleteProduct"],
        }),

        editProduct: builder.mutation({
            query: ({ userID, productID, data }) => {
                return {
                    url: `/api/products/${userID}/edit-product/${productID}`,
                    method: "PATCH",
                    body: data
                };
            },
            invalidatesTags: ["updateProduct"]
        }),
    }),
});

export const { useGetProductsQuery, useGetSingleProductsQuery, useAddSingleProductMutation, useEditProductMutation, useDeleteProductMutation } = productSlice;

export default productSlice;
