"use client";
import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/store/auth/authActions";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { message } from "antd";
import { resetAuthData } from "@/store/auth/authSlice";

const Signup = () => {
  const dispatch = useDispatch();

  const {
    loading,
    message: authMessage,
    error,
  } = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignup = () => {
    dispatch(signup(user));
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
      <div className={styles.container}>
        <div className={styles.container_1}>
          <h1>Sign up</h1>
        </div>
        <div className={styles.container_2}>
          <div className={styles.input_controller}>
            <p>Full name</p>
            <input
              type="text"
              placeholder="Please enter you full name"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          </div>
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
            <p>Mobile</p>
            <input
              type="text"
              placeholder="Please enter your mobile number"
              name="mobile"
              value={user.mobile}
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
          <div className={styles.input_controller}>
            <p>Confirm password</p>
            <input
              type="password"
              placeholder="Please confirm your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <div className={styles.sign_button}>
            <button onClick={handleSignup}>Sign up</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
