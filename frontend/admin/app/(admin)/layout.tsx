"use client";
import HeaderComponent from "@/components/header";
import LayoutAdminComponent from "@/components/layout/admin";
import withProtectedRoute from "@/components/protection/withProtectedRoute";
import withRoleCheck from "@/components/protection/withRoleCheck";
import { ROLE } from "@/constant/role";
import { ChildrenComponentProps } from "@/types/children";

const LayoutAdmin: React.FC<ChildrenComponentProps> = ({ children }: ChildrenComponentProps) => {
  return (
    <LayoutAdminComponent>
      <HeaderComponent />
      <div style={{ margin: "6.5rem 1rem 0 13.58rem ", borderRadius: "0.5rem" }}> {children}</div>
    </LayoutAdminComponent>
  );
}

export default withProtectedRoute(withRoleCheck(LayoutAdmin, [ROLE.ADMIN]));
