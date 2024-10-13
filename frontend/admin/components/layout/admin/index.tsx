"use client";
import React from "react";

import { FloatButton, Layout } from "antd";
import { ChildrenComponentProps } from "@/types/children";
import SiderComponent from "@/components/side";
import { ArrowUpOutlined } from "@ant-design/icons";

const LayoutAdminComponent: React.FC<ChildrenComponentProps> = ({
  children,
}: ChildrenComponentProps) => {
  return (
    <>
      <Layout style={{ height: "100vh", borderRadius: "1rem" }}>
        <SiderComponent />
        <Layout>
          {children}
        </Layout>
        <FloatButton.BackTop icon={<ArrowUpOutlined />} style={{ height: "2.8rem", width: "2.8rem" }} />
      </Layout>
    </>
  );
};

export default LayoutAdminComponent;
