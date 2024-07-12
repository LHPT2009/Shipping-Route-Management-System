"use client";
import TableComponent from "../../../components/table";
import BodyComponent from "../../../components/body";
import React from "react";
import type { TableColumnsType } from "antd";
import BreadcrumbComponent from "@/components/breadcrumb";
import { DataType } from "@/types/table";
import { BreadcrumbComponentProps } from "@/types/breadcrumb";

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Age",
    dataIndex: "age",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.age - b.age,
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const breadcrumbItems = [
  { name: "Home", link: "/" },
  { name: "List", link: "/list" },
  { name: "App" },
];

const userPage = () => {
  return (
    <>
      <BreadcrumbComponent items={breadcrumbItems} />
      <BodyComponent>
        <TableComponent columns={columns} dataSource={data} />
      </BodyComponent>
    </>
  );
};

export default userPage;
