"use client";

import LayoutComponent from "@/components/layout/client";
import BodyComponent from "@/components/body";
import HompageComponent from "@/components/homepage";

export default function Home() {
  return (
    <div>
      <LayoutComponent>
        <BodyComponent>
          <HompageComponent />
        </BodyComponent>
      </LayoutComponent>
    </div>
  );
}
