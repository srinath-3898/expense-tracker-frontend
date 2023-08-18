import { createSlice } from "@reduxjs/toolkit";
import { addExpense, deleteExpense, editExpense } from "./expenseActions";

export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    //add expense
    builder
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExpense.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addExpense.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error?.message;
      });

    //edit expense
    builder
      .addCase(editExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(editExpense.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(editExpense.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error?.message;
      });

    //delete expense
    builder
      .addCase(deleteExpense.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteExpense.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error?.message;
      });
  },
});

export default expenseSlice.reducer;
