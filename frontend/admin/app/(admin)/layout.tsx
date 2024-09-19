"use client";
import HeaderComponent from "@/components/header";
import LayoutAdminComponent from "@/components/layout/admin";
import LoadingComponent from "@/components/loading";
import withProtectedRoute from "@/components/protection/withProtectedRoute";
import withRoleCheck from "@/components/protection/withRoleCheck";
import { ROLE } from "@/constant/role";
import { useAppSelector } from "@/lib/hooks/hooks";
import { AdminPermissions, AdminRoles } from "@/lib/permissions/admin";
import { ChildrenComponentProps } from "@/types/children";

const LayoutAdmin: React.FC<ChildrenComponentProps> = ({ children }: ChildrenComponentProps) => {

  return (
    <LayoutAdminComponent>
      <HeaderComponent />
      <div style={{ margin: "6.5rem 1rem 0 13.58rem ", borderRadius: "0.5rem" }}>
        {children}
      </div>
    </LayoutAdminComponent>
  );
}

export default withProtectedRoute(withRoleCheck(LayoutAdmin, AdminRoles, AdminPermissions));
