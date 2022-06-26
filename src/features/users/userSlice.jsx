import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { login: false },
  reducers: {
    login: (state) => {
      state.login = !state.login;
    },
  },
});

export const { login } = userSlice.actions;

export default userSlice.reducer;

export const selectLogin = (state) => state.user.login;
