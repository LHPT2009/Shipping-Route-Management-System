"use client";

import type { RootState } from "../lib/store/index";
import { useAppDispatch, useAppSelector } from "../lib/hooks/hooks";
import { counterActions } from "../lib/store/counter";
import { Button, Input, Space } from "antd";
import BreadcrumbComponent from "@/components/breadcrumb";

export default function Home() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <BreadcrumbComponent items={[{ name: "demo" }, { name: "demo" }]} />
      <Button
        type="primary"
        onClick={() => dispatch(counterActions.increment())}
      >
        Button
      </Button>
      <Space>
        <Input placeholder="Please Input" />
        <Button type="primary">Submit</Button>
      </Space>
    </div>
  );
}
