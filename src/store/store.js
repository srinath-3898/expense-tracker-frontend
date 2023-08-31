import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import expensesReducer from "./expenses/expensesSlice";
import expenseReducer from "./expense/expenseSlice";
import { createWrapper } from "next-redux-wrapper";
import paymentReducer from "./payment/paymentSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    expense: expenseReducer,
    payment: paymentReducer,
  },
});

export const wrapper = createWrapper(() => store);
