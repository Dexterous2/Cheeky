import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/Config";

const connections = createApi({
    reducerPath: "connections",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ["acceptRequest", "sendRequest", "cancelRequest", "deleteConnections"],
    endpoints: (builder) => ({

        sendRequest: builder.mutation({
            query: ({ brandID, userID }) => {
                return {
                    url: `api/${brandID}/send-request/${userID}`,
                    method: "POST",
                };
            },
            invalidatesTags: ["acceptRequest"],
        }),

        getRequest: builder.query({
            query: (userID) => {
                return {
                    url: `/api/get-request/${userID}`,
                    method: "GET",
                };
            },
            providesTags: ["acceptRequest", "sendRequest", "cancelRequest"],
        }),

        acceptRequest: builder.mutation({
            query: ({ brandID, userID }) => {
                return {
                    url: `/api/${brandID}/accept-request/${userID}`,
                    method: "POST",
                };
            },
            invalidatesTags: ["acceptRequest"],
        }),

        cancelRequest: builder.mutation({
            query: ({ brandID, userID }) => {
                return {
                    url: `/api/${brandID}/cancel-request/${userID}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["cancelRequest"],
        }),

        getConnection: builder.query({
            query: (brandID) => {
                return {
                    url: `/api/get-connections/${brandID}`,
                    method: "GET",
                };
            },
            providesTags: ["acceptRequest", "deleteConnections"],
        }),

        deleteConnection: builder.mutation({
            query: ({ brandID, userID }) => {
                return {
                    url: `/api/${brandID}/delete-connection/${userID}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["deleteConnections"],
        }),

    }),
});

export const { useSendRequestMutation, useGetRequestQuery, useAcceptRequestMutation, useCancelRequestMutation, useGetConnectionQuery, useDeleteConnectionMutation } = connections;

export default connections;
