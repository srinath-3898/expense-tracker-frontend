import { createSlice } from "@reduxjs/toolkit";
import { getAllExpenses } from "./expensesActions";

export const expensesSlice = createSlice({
  name: "expenses",
  initialState: { loading: false, expenses: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllExpenses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllExpenses.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.expenses = payload?.data?.data;
        state.error = null;
      })
      .addCase(getAllExpenses.rejected, (state, { error }) => {
        state.loading = false;
        state.expenses = null;
        state.error = error?.message;
      });
  },
});

export default expensesSlice.reducer;
