import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLeaderboard = createAsyncThunk(
  "leaderboard/getLeaderboard",
  async (params, { rejectWithValue }) => {
    try {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const response = api.get("/premium/leaderboard");
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
