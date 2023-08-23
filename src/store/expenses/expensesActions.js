import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllExpenses = createAsyncThunk(
  "expenses/getAllExpenses",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/expense/expenses"
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);
