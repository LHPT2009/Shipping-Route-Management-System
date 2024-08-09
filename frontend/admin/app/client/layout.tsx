import React from "react";
import LayoutComponent from "@/components/layout/client";
import { ChildrenComponentProps } from "@/types/children";

const clientLayout: React.FC<ChildrenComponentProps> = ({ children }) => {
  return (
    <>
      <LayoutComponent>{children}</LayoutComponent>
    </>
  );
};

export default clientLayout;
