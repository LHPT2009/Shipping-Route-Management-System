import React from "react";
import LayoutAdminComponent from "@/components/layout/admin";

const routePage = () => {
    const breadcrumbItems = [
        { title: "Home", href: "/" },
        { title: "User", href: "/user" },
        { title: "Bill" }
    ];
    return (
        <LayoutAdminComponent listbread={breadcrumbItems}>routePage</LayoutAdminComponent>
    );
};

export default routePage;
