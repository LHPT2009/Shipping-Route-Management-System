"use client";

import LayoutAdminComponent from "@/components/layout/admin";

export default function Home() {
  const breadcrumbItems = [
    { title: "Home", href: "/" },
    { title: "User", href: "/user" },
    { title: "Bill" }
  ];
  return (
    <LayoutAdminComponent listbread={breadcrumbItems}>
      asdasd
    </LayoutAdminComponent>
  );
}
