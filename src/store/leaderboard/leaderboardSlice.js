const { createSlice } = require("@reduxjs/toolkit");
const { getLeaderboard } = require("./leaderboardActions");

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    loading: false,
    leaderboard: null,
    error: null,
  },
  reducers: {
    resetLeaderboardData: (state) => {
      state.loading = false;
      state.leaderboard = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLeaderboard.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.leaderboard = payload?.data?.data;
      })
      .addCase(getLeaderboard.rejected, (state, error) => {
        state.loading = false;
        if (error?.payload) {
          state.error = error?.payload?.data?.message;
        } else {
          state.error = error?.error?.message;
        }
      });
  },
});

export default leaderboardSlice.reducer;
