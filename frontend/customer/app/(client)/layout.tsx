import React from "react";
import LayoutComponent from "@/components/layout/client";
import { ChildrenComponentProps } from "@/types/children";
import { FloatButton } from "antd";

const ClientLayout: React.FC<ChildrenComponentProps> = ({ children }) => {
  return (
    <LayoutComponent>
      {children}
    </LayoutComponent>
  );
};

export default ClientLayout;
