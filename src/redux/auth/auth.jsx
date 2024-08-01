import { API_BASE_URL } from "@/utils/Config";
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const auth = createApi({
	reducerPath: "auth",
	baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
	tagTypes: ["update-profile"],
	endpoints: (builder) => ({

		login: builder.mutation({
			query: (data) => {
				return {
					url: "/auth/login",
					method: "POST",
					body: data,
				};
			},
			providesTags: ["update-profile"]
		}),

		influencerRegister: builder.mutation({
			query: (data) => {
				return {
					url: "/auth/register",
					method: "POST",
					body: data,
				};
			},
		}),

		brandOwnerRegister: builder.mutation({
			query: (data) => {
				return {
					url: "/auth/register-brand",
					method: "POST",
					body: data,
				};
			},
		}),

		forgetPass: builder.mutation({
			query: (data) => {
				return {
					url: "/auth/forgot-password",
					method: "PATCH",
					body: data,
				};
			},
		}),

		otpVerify: builder.mutation({
			query: (data) => {
				return {
					url: "/auth/otp-verify",
					method: "POST",
					body: data,
				};
			},
		}),

		resetPass: builder.mutation({
			query: (data) => {
				return {
					url: "/auth/reset-password",
					method: "PATCH",
					body: data,
				};
			},
		}),

		instaAuth: builder.query({
			query: ({ userId, accessToken, influencerID }) => {
				return {
					url: `/auth/insta-token?userId=${userId}&accessToken=${accessToken}&loginId=${influencerID}`,
					method: "GET",
				};
			},
		}),



	}),
});

export const { useLoginMutation, useInfluencerRegisterMutation, useBrandOwnerRegisterMutation, useForgetPassMutation, useOtpVerifyMutation, useResetPassMutation, useInstaAuthQuery } = auth;

export default auth;
