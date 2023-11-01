import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    token: null,
  },
  reducers: {
    setAdminToken: (state, action) => {
      state.token = action.payload;
    },
   
  },
})

export const { setAdminToken } = adminSlice.actions;
export default adminSlice.reducer;