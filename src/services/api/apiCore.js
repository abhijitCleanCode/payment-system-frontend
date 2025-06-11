// import react specific version
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = "http://localhost:5001";

export const apiCore = createApi({
  reducerPath: "apiCore", // add a reducer to redux store
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    // inject user auth token at each request headers
    prepareHeaders: (headers, { getState }) => {
      // 1. access the auth token from the state
      let token = getState().auth.token;

      if (token) {
        // injecting
        headers.Authorization = `Bearer ${token}`;
      }

      return headers;
    },
  }),
  // define types for cache mgmt
  tagTypes: ["User", "Headers", "Payment", "Transaction"],
  endpoints: () => ({}),
});
