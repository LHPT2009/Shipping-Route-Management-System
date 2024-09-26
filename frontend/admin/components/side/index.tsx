"use client";
import React, { useEffect, useState } from "react";
import { Layout, Flex, Menu, Divider } from "antd";
import Image from "next/image";
import { COLOR, KEYMENU, LABELMENU } from "@/constant";
import logoFull from "@/public/logo/logoFull.png";
import { EnvironmentOutlined, LineChartOutlined, TeamOutlined, UnlockOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { responsiveActions } from "@/lib/store/responsive";
import { useRouter } from "next/navigation";
import { menuActions, MenuState } from "@/lib/store/menu";

const { Sider, Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: LABELMENU.DASHBOARD,
    key: KEYMENU.DASHBOARD,
    icon: <LineChartOutlined />,
  },
  {
    label: LABELMENU.USER,
    key: KEYMENU.USER,
    icon: <UserOutlined />,
  },
  {
    label: LABELMENU.ROUTE,
    key: KEYMENU.ROUTE,
    icon: <EnvironmentOutlined />,
  },
  {
    label: LABELMENU.ROLE,
    key: KEYMENU.ROLE,
    icon: <TeamOutlined />,
  },
  {
    label: LABELMENU.PERMISSION,
    key: KEYMENU.PERMISSION,
    icon: <UnlockOutlined />,
  }
];

const SiderComponent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    const value: MenuState = {
      keyMenu: e.key,
      labelMenu: e.key
    }
    dispatch(menuActions.changeInfoMenu(value))
    dispatch(responsiveActions.changeStatusBackground(true));
    if (e.key === "dashboard") {
      router.push(`/`);
    } else {
      router.push(`/${e.key}`);
    }
  };

  const getKeyMenu: string = useAppSelector((state) => state.menu.keyMenu);

  const [selectedKey, setSelectedKey] = useState<string>(getKeyMenu);

  useEffect(() => {
    setSelectedKey(getKeyMenu);
  }, [getKeyMenu]);

  return (
    <Sider
      breakpoint="md"
      collapsedWidth="0"
      onBreakpoint={async (broken) => {
        if (broken === false) {
          await dispatch(responsiveActions.changeStatusBackground(true));
        }
        await dispatch(responsiveActions.changeStatusResponse(broken));
      }}
      onCollapse={async (collapsed, type) => {
        if (type === "clickTrigger") {
          await dispatch(responsiveActions.changeStatusBackground(collapsed));
        }
      }}
      style={{
        height: '100vh',
        position: 'fixed',
        zIndex: 2000,
      }}
    >
      <Layout style={{ height: "100%", padding: "16px 0px" }}>
        <Header
          style={{ display: "flex", padding: "0px 10px", height: "150px", borderRadius: "0.5rem" }}
        >
          <Flex justify="center" align="center">
            <Image src={logoFull} style={{ width: "85%" }} alt="Logo" />
          </Flex>
        </Header>
        <Content
          style={{
            backgroundColor: COLOR.BACKGROUND,
            borderRadius: "0.5rem"
          }}
        >
          <div style={{ padding: "0px 30px 0px 20px" }}>
            <Divider
              orientation="left"
              orientationMargin="0px"
              style={{
                marginTop: "30px 0px 0px 0px",
                borderColor: COLOR.TEXT,
              }}
            >
              Navigation Menu
            </Divider>
          </div>
          <Menu onClick={onClick} mode="vertical" items={items} selectedKeys={[selectedKey]} />
        </Content>
        <Footer style={{ borderRadius: "0.5rem" }}>
          <Flex justify="center" align="center">
            <div>@2024 - T6</div>
          </Flex>
        </Footer>
      </Layout>
    </Sider>
  );
};

export default SiderComponent;
