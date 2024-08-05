"use client";
import React from "react";

import { Layout } from "antd";
import { ChildrenComponentProps } from "@/types/children";
import { COLOR } from "@/constant";

const { Content } = Layout;

const LayoutAuthComponent: React.FC<ChildrenComponentProps> = ({
  children,
}: ChildrenComponentProps) => {
  return (
    <Layout
      style={{
        height: "auto",
        width: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(45deg, #e0f2fe, #ede9fe)"
        }}
      >
        <Content>{children}</Content>
      </div>
    </Layout>
  );
};

export default LayoutAuthComponent;
