import styles from "./Leaderboard.module.css";
import { getLeaderboard } from "@/store/leaderboard/leaderboardActions";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Leaderboard = () => {
  const dispatch = useDispatch();

  const { loading, leaderboard, error } = useSelector(
    (state) => state.leaderboard
  );

  useEffect(() => {
    dispatch(getLeaderboard());
  }, []);

  return (
    <div className={styles.container}>
      {!loading && leaderboard && !error ? (
        <div className={styles.container_1}>
          <h2>Expenses</h2>
        </div>
      ) : (
        <></>
      )}
      {!loading && !leaderboard && error ? (
        <div className={styles.error}>
          <p>{error}</p>
          <p>Error Fetching leaderboard</p>
          <p>Please try again...</p>
        </div>
      ) : (
        <></>
      )}
      {loading && !leaderboard && !error ? (
        <div className={styles.loading}>
          <Spin
            indicator={
              <LoadingOutlined style={{ color: "#000000", fontSize: "30px" }} />
            }
          />
        </div>
      ) : (
        <></>
      )}
      {!loading && leaderboard && leaderboard?.length > 0 && !error ? (
        <div className={styles.container_2}>
          <div className={styles.container_2_box_1}>
            <p>User Id</p>
            <p>User name</p>
            <p>Total expenses</p>
          </div>
          {leaderboard?.map((user) => (
            <div className={styles.container_2_box_2} key={user?.userId}>
              <p>{user?.userId}</p>
              <p>{user?.name}</p>
              <p>{user?.totalExpenses}</p>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
      {!loading && leaderboard && leaderboard?.length === 0 ? (
        <div className={styles.no_data}>
          <p>No expenses to display</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Leaderboard;
