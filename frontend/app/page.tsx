"use client";

import type { RootState } from "../lib/store/index";
import { useAppDispatch, useAppSelector } from "../lib/hooks/hooks";
import { counterActions } from "../lib/store/counter";
import { Button, Input, Space } from "antd";
import BreadcrumbComponent from "@/components/breadcrumb";
import { BreadcrumbItem } from "@/types/breadcrumb";
import LayoutComponent from "@/components/layout";
import HeadBodyComponent from "@/components/headbody";
import BodyComponent from "@/components/body";

export default function Home() {
  // const count = useAppSelector((state: RootState) => state.counter.value);
  // const dispatch = useAppDispatch();

  // const breadcrumbItems: BreadcrumbItem[] = [
  //   { name: "Home", link: "/" },
  //   { name: "List", link: "/list" },
  //   { name: "App" },
  // ];
  return (
    <div>
      <LayoutComponent>
        <HeadBodyComponent />
        {/* <BreadcrumbComponent items={breadcrumbItems} /> */}
        <BodyComponent>asdas</BodyComponent>
      </LayoutComponent>
    </div>
  );
}
