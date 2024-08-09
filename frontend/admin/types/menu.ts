import { MenuProps } from "antd";

export interface MenuComponentProps {
  defaultSelectedKeys?: string[];
  mode?: MenuProps['mode'];
  responsive: boolean;
};