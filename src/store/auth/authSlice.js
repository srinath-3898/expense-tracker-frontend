import { forgotPassword, profile, signin, signup } from "./authActions";

const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: null,
    user: null,
    message: null,
    error: null,
  },
  reducers: {
    resetSigninAndSignupData: (state) => {
      state.loading = false;
      state.message = null;
      state.error = null;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
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

    //user signin
    builder
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.token = payload?.data?.data?.token;
        state.user = payload?.data?.data?.user;
        state.message = payload?.data?.message;
      })
      .addCase(signin.rejected, (state, error) => {
        state.loading = false;
        if (error?.payload) {
          state.error = error?.payload?.data?.message;
        } else {
          state.error = error?.error?.message;
        }
      });

    //user profile
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
      })
      .addCase(profile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload?.data?.data;
        state.message = payload?.data?.message;
      })
      .addCase(profile.rejected, (state, error) => {
        state.loading = false;
        if (error?.payload) {
          state.error = error?.payload?.data?.message;
        } else {
          state.error = error?.error?.message;
        }
      });

    //forgot password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.message = payload?.data?.message;
      })
      .addCase(forgotPassword.rejected, (state, error) => {
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
export const { resetSigninAndSignupData, setToken, setUser } =
  authSlice.actions;
