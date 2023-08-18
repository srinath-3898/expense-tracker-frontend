import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async (expense) => {
    try {
      const response = await axios.post(
        "https://crudcrud.com/api/c9b781c4083948369883326ba1dcc0b1/expenses",
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
      const response = await axios.put(
        `https://crudcrud.com/api/c9b781c4083948369883326ba1dcc0b1/expenses/${expenseId}`,
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
    console.log(expenseId);
    try {
      const response = await axios.delete(
        `https://crudcrud.com/api/c9b781c4083948369883326ba1dcc0b1/expenses/${expenseId}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
);
