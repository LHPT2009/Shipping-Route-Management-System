"use client";
import React from "react";
import HeaderComponent from "../../header";
import FooterComponent from "../../footer";

import { FloatButton, Layout } from "antd";
import { ChildrenComponentProps } from "@/types/children";
import { ArrowUpOutlined, CommentOutlined } from "@ant-design/icons";
import ChatComponent from "@/components/chat";

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
