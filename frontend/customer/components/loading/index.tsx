
import React from "react";
import { Spin } from "antd";
import { COLOR } from "@/constant/color";;

const LoadingComponent = () => {
  return (
    <Spin
      size="large"
      style={{
        margin: "21rem auto 18rem auto",
        width: "100%",
        color: COLOR.PRIMARY,
      }}></Spin>
  );
};

export default LoadingComponent;
