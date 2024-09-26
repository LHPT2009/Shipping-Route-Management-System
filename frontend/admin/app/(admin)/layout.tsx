"use client";
import HeaderComponent from "@/components/header";
import LayoutAdminComponent from "@/components/layout/admin";
import withProtectedRoute from "@/components/protection/withProtectedRoute";
import withRoleCheck from "@/components/protection/withRoleCheck";
import { AdminPermissions, AdminRoles } from "@/lib/permissions/admin";
import { ChildrenComponentProps } from "@/types/children";

const LayoutAdmin: React.FC<ChildrenComponentProps> = ({ children }: ChildrenComponentProps) => {

  return (
    <LayoutAdminComponent>
      <HeaderComponent />
      {children}
    </LayoutAdminComponent>
  );
}

export default withProtectedRoute(withRoleCheck(LayoutAdmin, AdminRoles, AdminPermissions));
