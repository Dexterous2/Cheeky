import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/Config";

const marketplace = createApi({
    reducerPath: "marketplace",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({

        getMarketPlace: builder.query({
            query: ({ userID }) => {
                return {
                    url: `/api/marketplace/${userID}`,
                    method: "GET",
                };
            },
        }),

        getMarketPlaceUser: builder.query({
            query: ({ catName, userID }) => {
                return {
                    url: `/api/${userID}/get-users-of?category=${catName}`,
                    method: "GET",
                };
            },
        }),

        getSingleUserOf: builder.query({
            query: ({ brandID, userID, category }) => {
                return {
                    url: `/api/${brandID}/get-single-users-of/${userID}?category=${category}`,
                    method: "GET",
                };
            },
        }),

    }),
});

export const { useGetMarketPlaceQuery, useGetMarketPlaceUserQuery, useGetSingleUserOfQuery } = marketplace;

export default marketplace;