import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllExpenses = createAsyncThunk(
  "expenses/getAllExpenses",
  async () => {
    try {
      const response = await axios.get(
        "https://crudcrud.com/api/c9b781c4083948369883326ba1dcc0b1/expenses"
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);
