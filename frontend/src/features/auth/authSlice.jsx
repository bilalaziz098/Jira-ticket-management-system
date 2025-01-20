import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  registeredUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailed: (state, action) => {
      alert("login fail");
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    registerUser: (state, action) => {
      const data = action.payload;
      if (typeof data === "object") {
        state.registeredUsers.push(data);
        console.log(state.registeredUsers);
      } else {
        console.log("invalid type", action.payload);
      }
    },
    reset: (state, action) => {
      state.registeredUsers = [];
    },
  },
});

export const { loginSuccess, loginFailed, logout, registerUser, reset } =
  authSlice.actions;
export default authSlice.reducer;
