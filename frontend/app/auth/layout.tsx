import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const authLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default authLayout;
