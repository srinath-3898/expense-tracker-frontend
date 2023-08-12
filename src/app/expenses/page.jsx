"use client";
import React, { useEffect, useState } from "react";
import styles from "./Expenses.module.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState(null);

  const [expenseFormData, setExpenseFormData] = useState({
    amount: 0,
    category: "movies",
    description: "",
  });

  const [isEditExpense, setIsEditExpense] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExpenseFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddExpense = (event) => {
    event.preventDefault();
    const expenses = JSON.parse(localStorage.getItem("expenses"));
    if (expenses) {
      expenses.push(expenseFormData);
      setExpenses(expenses);
      localStorage.setItem("expenses", JSON.stringify(expenses));
    } else {
      const expenses = [];
      expenses.push(expenseFormData);
      setExpenses(expenses);
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
    setExpenseFormData({ amount: 0, category: "movies", description: "" });
    setIsEditExpense(false);
  };

  const handleEditExpense = (index) => {
    setIsEditExpense(true);
    for (let i = 0; i < expenses?.length; i++) {
      if (i === index) {
        setExpenseFormData(expenses[i]);
        break;
      }
    }
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((expense, i) => i !== index);
    setExpenses(updatedExpenses);
    if (updatedExpenses?.length > 0) {
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
    } else {
      localStorage.clear();
    }
  };

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem("expenses"));
    setExpenses(expenses);
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.expense_form} onSubmit={handleAddExpense}>
        <h1>Expense Form</h1>
        <div className={styles.input_controller}>
          <p>Amount</p>
          <input
            type="number"
            placeholder="Please enter expense ammount"
            name="amount"
            value={expenseFormData.amount}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.input_controller}>
          <p>Category</p>
          <select
            name="category"
            value={expenseFormData.category}
            onChange={handleInputChange}
          >
            <option value="movie">Movies</option>
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
            value={expenseFormData.description}
            placeholder="Please enter the description of the expense"
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">
          {isEditExpense ? "Edit Expense" : "Add Expense"}
        </button>
        {isEditExpense ? (
          <button onClick={() => setIsEditExpense(false)}>Cancel</button>
        ) : (
          <></>
        )}
      </form>
      {expenses && expenses?.length > 0 ? (
        <div className={styles.expenses_table}>
          <div className={styles.table_header}>
            <p>Description</p>
            <p>Category</p>
            <p>Amount</p>
            <p>Edit</p>
            <p>Delete</p>
          </div>
          <div className={styles.table_body}>
            {expenses?.map((expense, i) => (
              <div className={styles?.expense} key={i}>
                <p>{expense.description}</p>
                <p>{expense.category}</p>
                <p>{expense.amount}</p>
                <button onClick={() => handleEditExpense(i)}>Edit</button>
                <button onClick={() => handleDeleteExpense(i)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Expenses;
