"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Expenses.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadExpenses,
  getAllExpenses,
} from "@/store/expenses/expensesActions";
import {
  addExpense,
  deleteExpense,
  editExpense,
} from "@/store/expense/expenseActions";
import { Popconfirm, Spin, Tooltip, message } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { resetExpenseData } from "@/store/expense/expenseSlice";
import Link from "next/link";
import { resetDownloadExpensesData } from "@/store/expenses/expensesSlice";

const Expenses = () => {
  const dispatch = useDispatch();

  const {
    loading,
    expenses,
    downloadExpensesLoading,
    url,
    message: downloadExpensesMessage,
    error,
  } = useSelector((state) => state.expenses);
  const {
    loading: expenseLoading,
    message: expenseMessage,
    error: expenseError,
  } = useSelector((state) => state.expense);
  const { user } = useSelector((state) => state.auth);

  const [expense, setExpense] = useState({
    amount: "",
    category: "movies",
    description: "",
  });
  const [expenseId, setExpenseId] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [messageApi, contextHolder] = message.useMessage();

  const downloadRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setExpense((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddExpense = () => {
    dispatch(addExpense(expense)).then(() => {
      dispatch(getAllExpenses({ pageSize, page: 1 }));
    });
    setExpense({ amount: "", category: "movies", description: "" });
  };

  const handleEditExpense = () => {
    dispatch(editExpense({ expenseId, expense })).then((response) => {
      if (response?.payload?.data?.status)
        dispatch(getAllExpenses({ pageSize, page: 1 }));
    });
    setExpenseId(null);
    setExpense({ amount: "", category: "movies", description: "" });
  };

  const handleCancel = () => {
    setExpenseId(null);
    setExpense({ amount: 0, category: "movies", description: "" });
  };

  const handleDeleteExpense = (expenseId) => {
    dispatch(deleteExpense(expenseId)).then((response) => {
      if (response?.payload?.data?.status)
        dispatch(getAllExpenses({ pageSize, page: 1 }));
    });
  };

  const handleDownloadExpenses = () => {
    dispatch(downloadExpenses());
  };

  useEffect(() => {
    dispatch(getAllExpenses({ pageSize, page: 1 }));
  }, []);

  useEffect(() => {
    if (url) {
      downloadRef.current.click();
      dispatch(resetDownloadExpensesData());
    }
  }, [url]);

  useEffect(() => {
    if (expenseMessage || expenseError || url || downloadExpensesMessage) {
      messageApi.open({
        content: expenseMessage
          ? expenseMessage
          : expenseError
          ? expenseError
          : downloadExpensesMessage,
        icon:
          expenseMessage || url || downloadExpensesMessage ? (
            <CheckCircleFilled style={{ color: "#00a300" }} />
          ) : (
            <CloseCircleFilled style={{ color: "red" }} />
          ),
      });
    }
    dispatch(resetExpenseData());
    dispatch(resetDownloadExpensesData());
  }, [error, expenseMessage, expenseError, url, downloadExpensesMessage]);

  return (
    <>
      {contextHolder}
      {url ? <Link href={url} ref={downloadRef}></Link> : <></>}
      <div className={styles.container}>
        <div className={styles.container_1}>
          <h1>{expenseId ? "Edit expense" : "Add expense"}</h1>
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
          <button
            onClick={expenseId ? handleEditExpense : handleAddExpense}
            disabled={loading}
          >
            {expenseLoading ? (
              <Spin
                indicator={
                  <LoadingOutlined
                    style={{ color: "#ffffff", fontSize: "16px" }}
                  />
                }
              />
            ) : expenseId ? (
              "Edit expense"
            ) : (
              "Add expense"
            )}
          </button>
          {expenseId ? (
            <button onClick={handleCancel} disabled={expenseLoading}>
              Cancel
            </button>
          ) : (
            <></>
          )}
        </div>
        {!loading && expenses && !error ? (
          <div className={styles.container_2}>
            <h2>Expenses</h2>
            <div className={styles.page_size}>
              <p>Size</p>
              <input
                type="number"
                onChange={(event) => setPageSize(event.target.value)}
                value={pageSize}
              />
            </div>
            <button
              onClick={() => dispatch(getAllExpenses({ pageSize, page: 1 }))}
            >
              Get your expenses
            </button>
            {user && user?.premiumUser ? (
              <button
                className={styles.download_expenses}
                onClick={handleDownloadExpenses}
                disabled={downloadExpensesLoading}
              >
                {downloadExpensesLoading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{ color: "#ffffff", fontSize: "16px" }}
                      />
                    }
                  />
                ) : (
                  "Download expenses"
                )}
              </button>
            ) : (
              <></>
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
        {loading && !expenses && !error ? <></> : <></>}
        {!loading && expenses && expenses?.data?.length > 0 && !error ? (
          <div className={styles.container_3}>
            <div className={styles.container_3_box_1}>
              <p>Description</p>
              <p>Category</p>
              <p>Amount</p>
              <div className={styles.edit}>
                <p>Edit</p>
              </div>
              <div className={styles.delete}>
                <p>Delete</p>
              </div>
            </div>
            {expenses?.data?.map((expense) => (
              <div className={styles.container_3_box_2} key={expense?.id}>
                <p>{expense?.description}</p>
                <p>
                  {expense?.category[0]?.toUpperCase() +
                    expense?.category?.slice(1)}
                </p>
                <p>{expense?.amount}</p>
                <Tooltip title="Edit expense">
                  <EditOutlined
                    onClick={() => {
                      setExpenseId(expense?.id);
                      setExpense({
                        amount: expense?.amount,
                        category: expense?.category,
                        description: expense?.description,
                      });
                    }}
                  >
                    Edit
                  </EditOutlined>
                </Tooltip>
                <Popconfirm
                  title="Delete expense"
                  description="Are you sure to delete this expense?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => handleDeleteExpense(expense?.id)}
                  icon={<WarningFilled style={{ color: "red" }} />}
                >
                  <Tooltip title="Delete expense">
                    <DeleteOutlined />
                  </Tooltip>
                </Popconfirm>
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
        {!loading && expenses && expenses?.data?.length === 0 && !error ? (
          <div className={styles.no_data}>
            <p>No expenses to display</p>
          </div>
        ) : (
          <></>
        )}
        {expenses && expenses?.totalRecords > pageSize ? (
          <div className={styles.pagination}>
            <div className={styles.pagination_buttons}>
              <button
                onClick={() => dispatch(getAllExpenses({ pageSize, page: 1 }))}
                disabled={loading || expenses?.currentPage === 1}
              >
                First page
              </button>
              <button
                onClick={() =>
                  dispatch(
                    getAllExpenses({
                      pageSize,
                      page: expenses?.currentPage - 1,
                    })
                  )
                }
                disabled={loading || expenses?.currentPage === 1}
              >
                Previous page
              </button>
              <button
                onClick={() =>
                  dispatch(
                    getAllExpenses({
                      pageSize,
                      page: expenses?.currentPage + 1,
                    })
                  )
                }
                disabled={
                  loading || expenses?.currentPage === expenses?.lastPage
                }
              >
                Next page
              </button>
              <button
                onClick={() =>
                  dispatch(
                    getAllExpenses({
                      pageSize,
                      page: expenses?.lastPage,
                    })
                  )
                }
                disabled={
                  loading || expenses?.currentPage === expenses?.lastPage
                }
              >
                Last page
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Expenses;
