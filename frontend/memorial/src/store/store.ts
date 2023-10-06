import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
// import userSlice from "./slices/userSlice";
// import tokenSlice from "./slices/tokenSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    // user: userSlice,
    // token: tokenSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
