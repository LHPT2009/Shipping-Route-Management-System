"use client";
import React from "react";
import { Table } from "antd";
import { TableComponentProps } from "../../types/table";

const TableComponent: React.FC<TableComponentProps> = ({
  columns,
  dataSource,
}) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default TableComponent;
