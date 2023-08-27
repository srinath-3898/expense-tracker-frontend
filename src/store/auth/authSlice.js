import { signup } from "./authActions";

const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    message: null,
    error: null,
  },
  reducers: {
    resetAuthData: (state) => {
      state.loading = false;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //user signup
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload?.data?.message;
      })
      .addCase(signup.rejected, (state, error) => {
        state.loading = false;
        if (error?.payload) {
          state.error = error?.payload?.data?.message;
        } else {
          state.error = error?.error?.message;
        }
      });
  },
});

export default authSlice.reducer;
export const { resetAuthData } = authSlice.actions;