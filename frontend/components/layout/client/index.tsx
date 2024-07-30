"use client";
import React from "react";
import HeaderComponent from "../../header";
import FooterComponent from "../../footer";

import { Layout } from "antd";
import { ChildrenComponentProps } from "@/types/children";

const { Content } = Layout;

const LayoutComponent: React.FC<ChildrenComponentProps> = ({
  children,
}: ChildrenComponentProps) => {
  return (
    <Layout style={{ height: "auto" }}>
      <HeaderComponent />
      <Content style={{ padding: "0 48px" }}>{children}</Content>
      <FooterComponent />
    </Layout>
  );
};

export default LayoutComponent;
