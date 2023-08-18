"use client";
import React, { useEffect, useState } from "react";
import styles from "./Expenses.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllExpenses } from "@/store/expenses/expensesActions";
import {
  addExpense,
  deleteExpense,
  editExpense,
} from "@/store/expense/expenseActions";
import Loading from "./loading";

const Expenses = () => {
  const dispatch = useDispatch();

  const { loading, expenses, error } = useSelector((state) => state.expenses);

  const [expense, setExpense] = useState({
    amount: 0,
    category: "movies",
    description: "",
  });

  const [expenseId, setExpenseId] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExpense((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddExpense = (event) => {
    event.preventDefault();
    dispatch(addExpense(expense)).then(() => {
      dispatch(getAllExpenses());
    });
    setExpense({ amount: 0, category: "movies", description: "" });
  };

  const handleEditExpense = (event) => {
    event.preventDefault();
    dispatch(editExpense({ expenseId, expense })).then(() => {
      dispatch(getAllExpenses());
    });
  };

  const handleCancel = () => {
    setExpenseId(null);
    setExpense({ amount: 0, category: "movies", description: "" });
  };

  const handleDeleteExpense = (expenseId) => {
    dispatch(deleteExpense(expenseId)).then(() => {
      dispatch(getAllExpenses());
    });
  };

  useEffect(() => {
    dispatch(getAllExpenses());
  }, []);

  return (
    <div className={styles.container}>
      <form
        className={styles.expense_form}
        onSubmit={expenseId === null ? handleAddExpense : handleEditExpense}
      >
        <h1>Expense Form</h1>
        <div className={styles.input_controller}>
          <p>Amount</p>
          <input
            type="number"
            placeholder="Please enter expense ammount"
            name="amount"
            value={expense.amount}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.input_controller}>
          <p>Category</p>
          <select
            name="category"
            value={expense.category}
            onChange={handleInputChange}
          >
            <option value="movies">Movies</option>
            <option value="food">Food</option>
            <option value="fuel">Fuel</option>
            <option value="books">Books</option>
            <option value="grocey">Grocey</option>
          </select>
        </div>
        <div className={styles.input_controller}>
          <p>Description</p>
          <textarea
            name="description"
            value={expense.description}
            placeholder="Please enter the description of the expense"
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">
          {expenseId !== null ? "Edit Expense" : "Add Expense"}
        </button>
        {expenseId !== null ? (
          <button onClick={handleCancel}>Cancel</button>
        ) : (
          <></>
        )}
      </form>
      {loading && !expenses && !error ? <Loading /> : <></>}
      {!loading && expenses && !error ? (
        <div className={styles.expenses_table}>
          <div className={styles.table_name}>
            <h2>Expenses Table</h2>
          </div>
          {expenses && expenses?.length > 0 ? (
            <>
              <div className={styles.table_header}>
                <p>Description</p>
                <p>Category</p>
                <p>Amount</p>
                <p>Edit</p>
                <p>Delete</p>
              </div>
              <div className={styles.table_body}>
                {expenses?.map((expense) => (
                  <div className={styles?.expense} key={expense?._id}>
                    <p>{expense?.description}</p>
                    <p>
                      {expense?.category[0]?.toUpperCase() +
                        expense?.category?.slice(1)}
                    </p>
                    <p>{expense?.amount}</p>
                    <button
                      onClick={() => {
                        setExpenseId(expense?._id);
                        setExpense({
                          amount: expense?.amount,
                          category: expense?.category,
                          description: expense?.description,
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={() => handleDeleteExpense(expense?._id)}>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.no_data}>
              <p>No expenses found</p>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      {!loading && !expenses && error ? (
        <div className={styles.error}>
          <p>{error}</p>
          <p>Error Fetching expenses</p>
          <p>Please try again...</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Expenses;
