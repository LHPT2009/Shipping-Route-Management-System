"use client";
import React from "react";
import HeaderComponent from "../../header";
import FooterComponent from "../../footer";

import { FloatButton, Layout } from "antd";
import { ChildrenComponentProps } from "@/types/children";
import { ArrowUpOutlined, CommentOutlined, OpenAIOutlined, UpOutlined } from "@ant-design/icons";

const { Content } = Layout;

const LayoutComponent: React.FC<ChildrenComponentProps> = ({
  children,
}: ChildrenComponentProps) => {
  return (
    <Layout style={{ height: "auto" }}>
      <HeaderComponent />
      <Content>{children}</Content>
      <FooterComponent />
      <FloatButton.BackTop icon={<ArrowUpOutlined />} style={{ height: "2.8rem", width: "2.8rem", insetBlockEnd: 110 }} />
      <FloatButton type="primary" icon={<OpenAIOutlined />} style={{ height: "2.8rem", width: "2.8rem" }}/>
    </Layout>
  );
};

export default LayoutComponent;
