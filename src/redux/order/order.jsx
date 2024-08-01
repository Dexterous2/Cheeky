import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/Config";

const order = createApi({
    reducerPath: "order",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ["initiateOrder", "sendPayment", "completeOrder", "releasePayment"],
    endpoints: (builder) => ({

        initiateOrder: builder.mutation({
            query: ({ brandID, userID, serviceID }) => {
                return {
                    url: `/api/${brandID}/initiate-order/${userID}/${serviceID}`,
                    method: "POST",
                };
            },
            invalidatesTags: ["initiateOrder"],
        }),

        getOrders: builder.query({
            query: (userID) => {
                return {
                    url: `/api/get-orders/${userID}`,
                    method: "GET",
                };
            },
            providesTags: ["initiateOrder", "sendPayment", "completeOrder", "releasePayment"]
        }),

        sendPaymentOrder: builder.mutation({
            query: ({ brandID, influencerID }) => {
                return {
                    url: `/api/${brandID}/send-payment/${influencerID}`,
                    method: "POST",
                };
            },
            invalidatesTags: ["sendPayment"],
        }),

        completeOrder: builder.mutation({
            query: ({ brandID, influencerID }) => {
                return {
                    url: `/api/${brandID}/complete-order/${influencerID}`,
                    method: "POST",
                };
            },
            invalidatesTags: ["completeOrder"],
        }),

        releasePayment: builder.mutation({
            query: ({ brandID, influencerID }) => {
                return {
                    url: `/api/${brandID}/cut-fee-pay-influencer/${influencerID}`,
                    method: "POST",
                };
            },
            invalidatesTags: ["releasePayment"],
        }),

        getCollaborations: builder.query({
            query: (userID) => {
                return {
                    url: `/api/past-collaborations/${userID}`,
                    method: "GET",
                };
            },
            providesTags: ["releasePayment"],
        }),

        transactionHistory: builder.query({
            query: (userID) => {
                return {
                    url: `/api/transaction-history/${userID}`,
                    method: "GET",
                };
            },
            providesTags: ["releasePayment", "sendPayment"],
        }),

    }),
});

export const { useInitiateOrderMutation, useGetOrdersQuery, useSendPaymentOrderMutation, useCompleteOrderMutation, useReleasePaymentMutation, useGetCollaborationsQuery, useTransactionHistoryQuery } = order;

export default order;
