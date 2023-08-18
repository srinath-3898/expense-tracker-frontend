import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses/expensesSlice";
import expenseReducer from "./expense/expenseSlice";

const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    expense: expenseReducer,
  },
});

export default store;
