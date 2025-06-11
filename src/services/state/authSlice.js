import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const getUserFromCookie = () => {
  const user = Cookies.get("pay-sys-user");
  return user ? JSON.parse(user) : null;
};

const getTokenFromCookie = () => {
  const token = Cookies.get("pay-sys-access-token");
  return token ? token : null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromCookie(), // for persisted state storage
    token: getTokenFromCookie(),
  },

  reducers: {
    setCredentials: function (state, action) {
      const payload = action.payload;
      state.user = payload?.data?.data;
      state.token = payload.data?.accessToken;

      const expireDays = 3; // Set the desired expiration days
      const cookieOptions = { expires: expireDays };

      //! potential update set cookie for server side to enhance secrity
      Cookies.set(
        "pay-sys-user",
        JSON.stringify(payload?.data?.data),
        cookieOptions
      );
      Cookies.set(
        "pay-sys-access-token",
        payload?.data?.accessToken,
        cookieOptions
      );
    },

    logout: function (state) {
      state.user = {};
      state.token = null;

      Cookies.remove("pay-sys-user");
      Cookies.remove("pay-sys-access-token");

      window.location.href = "/login";
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
