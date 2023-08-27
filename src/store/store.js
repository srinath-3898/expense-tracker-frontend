import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import expensesReducer from "./expenses/expensesSlice";
import expenseReducer from "./expense/expenseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    expense: expenseReducer,
  },
});

export default store;
