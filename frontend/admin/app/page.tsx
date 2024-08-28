"use client";

import ContentComponent from "@/components/content";
import HeaderComponent from "@/components/header";
import LayoutAdminComponent from "@/components/layout/admin";

export default function Home() {
  return (
    <LayoutAdminComponent>
      <HeaderComponent />
      <ContentComponent>asdasd</ContentComponent>
    </LayoutAdminComponent>
  );
}
