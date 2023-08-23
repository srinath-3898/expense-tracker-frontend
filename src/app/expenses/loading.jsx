import React from "react";
import styles from "./Loading.module.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = ({ fontSize = 100, color = "black" }) => {
  return (
    <div className={styles.container}>
      <Spin indicator={<LoadingOutlined style={{ fontSize, color }} />} />
    </div>
  );
};

export default Loading;
