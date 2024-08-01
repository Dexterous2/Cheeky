import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/Config";

const instaAuth = createApi({
    reducerPath: "instaAuth",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ["addInsta"],
    endpoints: (builder) => ({

        addInsta: builder.mutation({
            query: ({ data }) => {
                return {
                    url: `/auth/insta`,
                    method: "POST",
                    body: data
                };
            },
            invalidatesTags: ["addInsta"],
        }),

        deleteInsta: builder.mutation({
            query: (userID) => {
                return {
                    url: `/delete-insta-profile/${userID}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["addInsta"],
        }),

    }),
});

export const { useAddInstaMutation, useDeleteInstaMutation } = instaAuth;

export default instaAuth;
