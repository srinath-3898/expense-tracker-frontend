import api from "@/configs/apiConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expense, { rejectWithValue }) => {
    try {
      const response = await api.post(
        "http://localhost:8080/expense/add-expense",
        expense
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export const editExpense = createAsyncThunk(
  "expense/editExpense",
  async ({ expenseId, expense }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `http://localhost:8080/expense/edit-expense/${expenseId}`,
        expense
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (expenseId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `http://localhost:8080/expense/delete-expense/${expenseId}`
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response);
    }
  }
);
