import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isAuthenticated: boolean;
  accessToken: string | null;
  nickname: string | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  accessToken: null,
  nickname: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      // action: PayloadAction<{ id: string; nickname: string }>
      action: PayloadAction<{
        isAuthenticated: boolean;
        accessToken: string;
        nickname: string;
      }>
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.nickname = action.payload.nickname;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.nickname = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
