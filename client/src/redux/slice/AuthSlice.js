import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticatedAdmin: false,
    adminToken: null,
    isAuthenticatedUser: false,
    userToken: null,
  },
  reducers: {
    loginAdmin: (state, action) => {
      state.isAuthenticatedAdmin = true;
      state.adminToken = action.payload.token;
    },
    logoutAdmin: (state) => {
      state.isAuthenticatedAdmin = false;
      state.adminToken = null;
    },
    loginUser: (state, action) => {
      state.isAuthenticatedUser = true;
      state.userToken = action.payload.token;
    },
    logoutUser: (state) => {
      state.isAuthenticatedUser = false;
      state.userToken = null;
    },
  },
});

export const { loginAdmin, logoutAdmin, loginUser, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
