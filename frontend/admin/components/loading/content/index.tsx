
import React from "react";
import { Spin } from "antd";
import { COLOR } from "@/constant/color";;

const LoadingContent= () => {
  return (
    <Spin
      size="large"
      style={{
        margin: "0 auto",
        width: "100%",
        color: COLOR.PRIMARY,
      }}></Spin>
  );
};

export default LoadingContent;
