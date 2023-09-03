import React, { useEffect, useState } from "react";
import styles from "./ResetPassword.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "@/store/auth/authActions";
import { Spin, message } from "antd";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  LoadingOutlined,
} from "@ant-design/icons";
import { resetSigninAndSignupData } from "@/store/auth/authSlice";

const ResetPassword = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    loading,
    message: authMessage,
    error,
  } = useSelector((state) => state.auth);

  const [requestId, setRequestId] = useState(null);
  const [resetPasswordData, setResetPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [messageApi, contextHolder] = message.useMessage();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setResetPasswordData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleResetPassword = () => {
    dispatch(resetPassword({ requestId, resetPasswordData }));
  };

  useEffect(() => {
    setRequestId(router.query.requestId);
  }, [router]);

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

  return (
    <>
      {contextHolder}
      <div className={styles.container}>
        {requestId ? (
          <div className={styles.container_1}>
            <div className={styles.input_controller}>
              <p>New Password</p>
              <input
                type="password"
                placeholder="Please enter your new password"
                name="newPassword"
                value={resetPasswordData.newPassword}
                onChange={handleChange}
              />
            </div>
            <div className={styles.input_controller}>
              <p>Confirm Password</p>
              <input
                type="password"
                placeholder="Please confirm your password"
                name="confirmPassword"
                value={resetPasswordData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button onClick={handleResetPassword} disabled={loading}>
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ color: "#ffffff", fontSize: "16px" }}
                    />
                  }
                />
              ) : (
                "Reset password"
              )}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
