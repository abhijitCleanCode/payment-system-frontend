import { apiCore } from "./apiCore";

export const authApiSlice = apiCore.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/v1/user/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    //! potential update: useLazyQuery to get more manual control
    getUser: builder.query({
      query: () => ({
        url: "/api/v1/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery } = authApiSlice;
