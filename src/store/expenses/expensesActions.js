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
      throw error;
    }
  }
);
