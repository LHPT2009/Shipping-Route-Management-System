"use client";
import HeaderComponent from "@/components/header";
import LayoutAdminComponent from "@/components/layout/admin";
import withProtectedRoute from "@/components/protection";
import { ChildrenComponentProps } from "@/types/children";

const LayoutAdmin: React.FC<ChildrenComponentProps> = ({ children }: ChildrenComponentProps) => {
    return (
        <LayoutAdminComponent>
            <HeaderComponent />
            <div style={{ margin: "6.5rem 1rem 0 13.58rem "}}> {children}</div>
        </LayoutAdminComponent>
    );
}

export default withProtectedRoute(LayoutAdmin);