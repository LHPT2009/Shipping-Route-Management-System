import { MenuProps, Menu } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import React from "react";

export type MenuItem = Required<MenuProps>['items'][number] & { url?: string };

export const MENULIST: MenuItem[] = [
  {
    key: "1",
    label: "Homepage",
    url: "/",
  },
  {
    key: "2",
    label: "Routes",
    url: "/route",
  },
  {
    key: "3",
    label: "Contact Us",
    url: "/contact",
  },
];