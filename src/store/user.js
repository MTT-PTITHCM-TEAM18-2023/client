import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginService } from "../apis";

const initialState = {
  data: null,
  meta: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const res = await loginService({ email, password });
    localStorage.setItem("authentication_token", res.data.jwt);
    return res;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserMeta: (state, action) => {
      state.meta = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.meta = action.payload.data;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const { setUserMeta } = userSlice.actions;
export default userSlice.reducer;
