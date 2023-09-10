"use client";
import React, { useEffect, useState } from "react";
import styles from "./Signin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, signin } from "@/store/auth/authActions";
import { Modal, Spin, message } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { resetSigninAndSignupData } from "@/store/auth/authSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import api from "@/configs/apiConfig";

const Signin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading,
    token,
    message: authMessage,
    user: userInfo,
    error,
  } = useSelector((state) => state.auth);

  const [user, setUser] = useState({ email: "", password: "" });
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSigin = () => {
    dispatch(signin(user)).then((response) => {
      if (response?.payload?.data?.status) {
        api.defaults.headers.common["Authorization"] =
          response?.payload?.data?.data?.token;
      }
    });
  };

  const handleSendEmail = () => {
    dispatch(forgotPassword(forgotPasswordEmail)).then(() => {
      setForgotPasswordModalOpen(false);
      setForgotPasswordEmail("");
    });
  };

  useEffect(() => {
    if (token && userInfo) {
      router.push("/expenses");
    }
  }, [token, userInfo]);

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

  console.log(authMessage);

  return (
    <>
      {contextHolder}
      <div className={styles.conatiner}>
        <div className={styles.conatiner_1}>
          <h1>Sign In</h1>
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
            <div className={styles.password_title}>
              <p>Password</p>
              <p onClick={() => setForgotPasswordModalOpen(true)}>
                Forgot password?
              </p>
            </div>
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
        <div className={styles.container_3}>
          <p>{`Don't have an account?`}</p>
          <Link href={"/signup"}>Signup</Link>
          <p>to continue</p>
        </div>
      </div>
      <Modal
        title="Forgot password"
        open={forgotPasswordModalOpen}
        footer={null}
        closable={true}
        maskClosable={true}
        onCancel={() => setForgotPasswordModalOpen(false)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className={styles.forgot_password_modal}>
          <div className={styles.input_controller}>
            <p>Email</p>
            <input
              type="email"
              placeholder="Please enter you email"
              name="email"
              value={forgotPasswordEmail}
              onChange={(event) => setForgotPasswordEmail(event.target.value)}
            />
          </div>
          <div className={styles.modal_footer}>
            <button onClick={() => setForgotPasswordModalOpen(false)}>
              Cancel
            </button>
            <button onClick={handleSendEmail} disabled={loading}>
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ color: "#ffffff", fontSize: "16px" }}
                    />
                  }
                />
              ) : (
                "Send email"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Signin;
