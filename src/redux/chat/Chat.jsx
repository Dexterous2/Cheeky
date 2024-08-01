import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/utils/Config";

const Chat = createApi({
    reducerPath: "Chat",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({

        sendMessage: builder.mutation({
            query: ({ senderID, recieverID, data }) => {
                return {
                    url: `/api/${senderID}/send-message/${recieverID}`,
                    method: "POST",
                    body: data
                };
            },
        }),

        getMessage: builder.query({
            query: ({ senderID, recieverID }) => {
                return {
                    url: `/api/${senderID}/get-messages/${recieverID}`,
                    method: "GET",
                };
            },
        }),

    }),
});

export const { useSendMessageMutation, useGetMessageQuery } = Chat;

export default Chat;