import type { TableColumnsType } from "antd";

export interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

export interface TableComponentProps {
  columns: TableColumnsType<DataType>;
  dataSource: DataType[];
}
