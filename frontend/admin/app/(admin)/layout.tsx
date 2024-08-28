"use client";
import HeaderComponent from "@/components/header";
import LayoutAdminComponent from "@/components/layout/admin";
import { ChildrenComponentProps } from "@/types/children";

const LayoutAdmin: React.FC<ChildrenComponentProps> = ({ children }: ChildrenComponentProps) => {
    return (
        <LayoutAdminComponent>
            <HeaderComponent />
            {children}
        </LayoutAdminComponent>
    );
}

export default LayoutAdmin