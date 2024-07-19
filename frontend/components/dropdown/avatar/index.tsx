import React from "react";
import { MenuProps, Dropdown, Avatar } from "antd";
import { SettingOutlined } from "@ant-design/icons";
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

const avatarComponent = () => {
  return (
    <>
      <Dropdown menu={{ items }} trigger={["click"]} arrow={true}>
        <Avatar
          shape="circle"
          size="large"
          icon={<SettingOutlined />}
          style={{ color: COLOR.PRIMARY, backgroundColor: "#fff" }}
        />
      </Dropdown>
    </>
  );
};
export default avatarComponent;
