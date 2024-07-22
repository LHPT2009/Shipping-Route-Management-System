import { MenuProps, Menu } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import React from "react";

export type MenuItem = Required<MenuProps>['items'][number] & { url?: string };

export const MENULIST: MenuItem[] = [
  {
    key: "1",
    icon: React.createElement(UserOutlined),
    label: "ABC",
    url: "/",
  },
  {
    key: "2",
    icon: React.createElement(LaptopOutlined),
    label: "DEF",
    url: "/user",
  },
  {
    key: "3",
    icon: React.createElement(NotificationOutlined),
    label: "GHI",
    url: "/notification",
  },
  {
    key: "4",
    icon: React.createElement(NotificationOutlined),
    label: "CBV",
    url: "/cbv",
  },
  {
    key: "5",
    icon: React.createElement(NotificationOutlined),
    label: "QWE",
    url: "/qwe",
  }
];