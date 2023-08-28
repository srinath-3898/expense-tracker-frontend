"use client";
import React, { useEffect, useState } from "react";
import styles from "./Signup.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/store/auth/authActions";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { Spin, message } from "antd";
import { resetSigninAndSignupData } from "@/store/auth/authSlice";
import Link from "next/link";

const Signup = () => {
  const dispatch = useDispatch();

  const {
    loading,
    token,
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
    dispatch(resetSigninAndSignupData());
  }, [authMessage, error]);

  console.log(token);

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
          <div className={styles.signup_button}>
            <button onClick={handleSignup} disabled={loading}>
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ color: "#ffffff", fontSize: "16px" }}
                    />
                  }
                />
              ) : (
                "Signup"
              )}
            </button>
          </div>
        </div>
        <div className={styles.container_3}>
          <p>Already have an account?</p>
          <Link href={"/signin"}>Signin</Link>
          <p>to continue</p>
        </div>
      </div>
    </>
  );
};

export default Signup;
