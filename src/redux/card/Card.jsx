import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/Config";

const Card = createApi({
    reducerPath: "Card",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ["createCard", "removeCard"],
    endpoints: (builder) => ({

        createCard: builder.mutation({
            query: (data) => {
                return {
                    url: `/api/create-payment-method/`,
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["createCard"],
        }),

        removeCard: builder.mutation({
            query: ({ userID }) => {
                return {
                    url: `/api/remove-card/${userID}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["removeCard"],
        }),

        validateCard: builder.query({
            query: (userID) => {
                return {
                    url: `/api/validate-user-card/${userID}`,
                    method: "GET",
                };
            },
            providesTags: ["createCard", "removeCard"],
        }),

        getCardDetail: builder.query({
            query: ({ userID }) => {
                return {
                    url: `/api/get-payment-method/${userID}`,
                    method: "GET",
                };
            },
            providesTags: ["createCard", "removeCard"]
        }),

    }),
});

export const { useCreateCardMutation, useRemoveCardMutation, useGetCardDetailQuery, useValidateCardQuery } = Card;

export default Card;
