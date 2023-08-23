import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expense) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/expense/add-expense",
        expense
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const editExpense = createAsyncThunk(
  "expense/editExpense",
  async ({ expenseId, expense }) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/expense/edit-expense/${expenseId}`,
        expense
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async (expenseId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/expense/delete-expense/${expenseId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);
