import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import expensesReducer from "./expenses/expensesSlice";
import expenseReducer from "./expense/expenseSlice";
import { createWrapper } from "next-redux-wrapper";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    expense: expenseReducer,
  },
});

export const wrapper = createWrapper(() => store);
