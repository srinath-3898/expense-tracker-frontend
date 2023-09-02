import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authReducer from "./auth/authSlice";
import expensesReducer from "./expenses/expensesSlice";
import expenseReducer from "./expense/expenseSlice";
import paymentReducer from "./payment/paymentSlice";
import leaderboardReducer from "./leaderboard/leaderboardSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    expense: expenseReducer,
    payment: paymentReducer,
    leaderboard: leaderboardReducer,
  },
});

export const wrapper = createWrapper(() => store);
