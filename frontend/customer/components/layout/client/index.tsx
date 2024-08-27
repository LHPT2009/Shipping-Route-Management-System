"use client";
import React, { Suspense } from "react";
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
      <Content>{children}</Content>
      <FooterComponent />
    </Layout>
  );
};

export default LayoutComponent;
