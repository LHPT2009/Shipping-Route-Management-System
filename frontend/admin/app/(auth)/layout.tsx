import LayoutAuthComponent from "@/components/layout/auth";
import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const authLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <LayoutAuthComponent>{children}</LayoutAuthComponent>
    </>
  );
};

export default authLayout;
