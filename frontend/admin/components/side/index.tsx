"use client"
import React, { useState } from "react";
import { Layout, Flex, Menu, Divider } from "antd";
import Image from "next/image";
import { COLOR } from "@/constant";
import logoFull from "@/public/logo/logoFull.png";
import { MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { responsiveActions } from "@/lib/store/responsive";

const { Sider, Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Navigation One",
    key: "mail1",
    icon: <MailOutlined />,
  },
  {
    label: "Navigation Two",
    key: "mail2",
    icon: <MailOutlined />,
  },
  {
    label: "Navigation Three",
    key: "mail3",
    icon: <MailOutlined />,
  },
];

const SiderComponent = async () => {

  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const dispatch = useAppDispatch();

  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={async (broken) => {
        if (broken === false) {
          await dispatch(responsiveActions.changeStatusBackground(true))
        }
        await dispatch(responsiveActions.changeStatusResponse(broken))
      }}
      onCollapse={async (collapsed, type) => {
        if (type === "clickTrigger") {
          await dispatch(responsiveActions.changeStatusBackground(collapsed))
        }
      }}
      style={{ height: "100vh", backgroundColor: "#fff" }}
    >
      <Layout style={{ height: "100%", padding: "16px 0px" }}>
        <Header
          style={{ display: "flex", padding: "0px 10px", height: "150px" }}
        >
          <Flex justify="center" align="center">
            <Image src={logoFull} alt="Logo" />
          </Flex>
        </Header>
        <Content
          style={{
            backgroundColor: COLOR.BACKGROUND,
          }}
        >
          <div style={{ padding: "0px 30px 0px 20px" }}>
            <Divider
              orientation="left"
              orientationMargin="0px"
              style={{
                marginTop: "30px 0px 0px 0px",
                borderColor: COLOR.PRIMARY,
              }}
            >
              Menu
            </Divider>
          </div>
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="vertical"
            items={items}
          />
        </Content>
        <Footer>
          <Flex justify="center" align="center">
            <div>@2024 - T6</div>
          </Flex>
        </Footer>
      </Layout>
    </Sider>
  );
};

export default SiderComponent;
