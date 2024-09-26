import { MenuProps } from "antd";

export interface MenuComponentProps {
  defaultSelectedKeys?: string[];
  mode?: MenuProps['mode'];
  responsive: boolean;
  open: boolean;
  setOpen: (value: boolean) => void;
};