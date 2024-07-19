import React, { useState } from "react";
import { Drawer, Space, Menu, Col, Row } from "antd";
import type { MenuProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import SettingComponent from "../dropdown/setting";
import logoFull from "@/public/images/logoFull.png";
import NotificationComponent from "../dropdown/notification";
import LangComponent from "../dropdown/lang";
import { COLOR } from "@/constant";

const DrawerComponent: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items2: MenuProps["items"] = [
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  ].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });

  return (
    <>
      <Space>
        <MenuOutlined
          onClick={showDrawer}
          style={{
            color: COLOR.PRIMARY,
            fontSize: "25px",
            position: "absolute",
            marginTop: "-30px",
          }}
        />
      </Space>
      <Drawer
        title={
          <>
            <Row>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <Image width={200} height={50} src={logoFull} alt="Logo" />
              </Col>
            </Row>
            <Space
              size="middle"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <SettingComponent />
              <LangComponent />
              <NotificationComponent />
            </Space>
          </>
        }
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
          items={items2}
        />
      </Drawer>
    </>
  );
};

export default DrawerComponent;
