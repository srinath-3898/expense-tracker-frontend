import { createSlice } from "@reduxjs/toolkit";
import { downloadExpenses, getAllExpenses } from "./expensesActions";

export const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    loading: false,
    expenses: null,
    message: null,
    downloadExpensesLoading: false,
    url: null,
    error: null,
  },
  reducers: {
    resetDownloadExpensesData: (state) => {
      state.downloadExpensesLoading = false;
      state.url = null;
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    //get all expenses
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
        if (error?.payload) {
          state.error = error?.payload?.data?.message;
        } else {
          state.error = error?.error?.message;
        }
      });
    //download expenses
    builder
      .addCase(downloadExpenses.pending, (state) => {
        state.downloadExpensesLoading = true;
      })
      .addCase(downloadExpenses.fulfilled, (state, { payload }) => {
        state.downloadExpensesLoading = false;
        state.url = payload?.data?.data;
        state.message = payload?.data?.message;
      })
      .addCase(downloadExpenses.rejected, (state, { error }) => {
        state.downloadExpensesLoading = false;
        if (error?.payload) {
          state.error = error?.payload?.data?.message;
        } else {
          state.error = error?.error?.message;
        }
      });
  },
});

export default expensesSlice.reducer;
export const { resetDownloadExpensesData } = expensesSlice.actions;
