"use client";
import React, { useEffect, useState } from "react";
import styles from "./Signin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "@/store/auth/authActions";
import { Spin, message } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { resetAuthData } from "@/store/auth/authSlice";

const Signin = () => {
  const dispatch = useDispatch();

  const {
    loading,
    message: authMessage,
    error,
  } = useSelector((state) => state.auth);

  const [user, setUser] = useState({ email: "", password: "" });
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSigin = () => {
    dispatch(signin(user));
  };

  useEffect(() => {
    if (authMessage || error) {
      messageApi.open({
        content: authMessage ? authMessage : error,
        icon: authMessage ? (
          <CheckCircleFilled style={{ color: "#00a300" }} />
        ) : (
          <CloseCircleFilled style={{ color: "red" }} />
        ),
      });
    }
    dispatch(resetAuthData());
  }, [authMessage, error]);

  return (
    <>
      {contextHolder}
      <div className={styles.conatiner}>
        <div className={styles.conatiner_1}>
          <h1>Login</h1>
        </div>
        <div className={styles.container_2}>
          <div className={styles.input_controller}>
            <p>Email</p>
            <input
              type="email"
              placeholder="Please enter you email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_controller}>
            <p>Password</p>
            <input
              type="password"
              placeholder="Please enter your password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className={styles.signin_button}>
            <button onClick={handleSigin}>
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ color: "#ffffff", fontSize: "16px" }}
                    />
                  }
                />
              ) : (
                "Signin"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
