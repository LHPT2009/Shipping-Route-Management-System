import React, { useState } from "react";
import {
  Drawer,
  Space,
  Divider,
  Col,
  Row,
  Layout,
  Avatar,
  Typography,
} from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
import SettingComponent from "../dropdown/setting";
import logoFull from "@/public/logo/logoFull.png";
import NotificationComponent from "../dropdown/notification";
import LangComponent from "../dropdown/lang";
import FooterComponent from "../footer";
import { COLOR } from "@/constant";
import MenuComponent from "../menu";

const { Header } = Layout;

const DrawerComponent: React.FC = () => {
  const { Title } = Typography;

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Avatar
        shape="square"
        size="large"
        icon={<MenuOutlined />}
        onClick={showDrawer}
        style={{ color: COLOR.PRIMARY, backgroundColor: "#fff" }}
      />
      <Drawer
        title={
          <>
            <Row style={{ width: "100%" }}>
              <Header
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  padding: "0px",
                  width: "100%",
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "start",
                  }}
                >
                  <Space size="small" style={{ top: "-35px" }}>
                    <SettingComponent />
                    <NotificationComponent />
                  </Space>
                </Col>
                <Col
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image width={200} height={50} src={logoFull} alt="Logo" />
                </Col>
                <Col
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <Space size="middle">
                    <LangComponent />
                  </Space>
                </Col>
              </Header>
            </Row>
          </>
        }
        footer={
          <>
            <FooterComponent />
          </>
        }
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        style={{ width: "80vw" }}
      >
        <MenuComponent responsive={true} defaultSelectedKeys={["1"]} />
      </Drawer>
    </>
  );
};

export default DrawerComponent;
