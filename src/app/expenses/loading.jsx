import React from "react";
import styles from "./Loading.module.css";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = () => {
  return (
    <div className={styles.container}>
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 50, color: "black" }} />}
      />
    </div>
  );
};

export default Loading;
