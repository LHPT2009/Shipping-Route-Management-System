import React from "react";
import { MenuProps, Dropdown, Avatar, Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { COLOR } from "@/constant";

const items: MenuProps["items"] = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];

const notificationComponent = () => {
  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]} arrow={true}>
        <Badge count={1} size="default">
          <Avatar
            shape="circle"
            size="large"
            icon={<BellOutlined />}
            style={{ color: COLOR.PRIMARY, backgroundColor: "#fff" }}
          />
        </Badge>
      </Dropdown>
    </>
  );
};
export default notificationComponent;
