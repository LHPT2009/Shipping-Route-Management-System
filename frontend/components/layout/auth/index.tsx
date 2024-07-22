"use client";
import React from "react";

import { Layout } from "antd";
import { ChildrenComponentProps } from "@/types/children";
import { COLOR } from "@/constant";
import HeaderAuthComponent from "@/components/header/auth";
import FooterComponent from "@/components/footer";

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
      <HeaderAuthComponent />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLOR.BACKGROUND,
        }}
      >
        <Content>{children}</Content>
      </div>
      <FooterComponent />
    </Layout>
  );
};

export default LayoutAuthComponent;
