import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const Spinner = ({ size = 100, color = "black" }) => {
  return (
    <Spin indicator={<LoadingOutlined style={{ fontSize: size, color }} />} />
  );
};

export default Spinner;
