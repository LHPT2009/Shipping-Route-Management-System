"use client";
import React from "react";

import { Layout } from "antd";
import { ChildrenComponentProps } from "@/types/children";
import SiderComponent from "@/components/side";

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
      </Layout>
    </>
  );
};

export default LayoutAdminComponent;
