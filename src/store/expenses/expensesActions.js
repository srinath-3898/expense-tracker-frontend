import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllExpenses = createAsyncThunk(
  "expenses/getAllExpenses",
  async () => {
    try {
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const response = await api.get("/expense/expenses");
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export const downloadExpenses = createAsyncThunk(
  "expenses/downloadExpenses",
  async () => {
    try {
      const response = await api.get("/premium/download");
      console.log(response);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
