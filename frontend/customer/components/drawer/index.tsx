import React, { useState } from "react";
import { Drawer, Col, Row, Layout, Avatar } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Image from "next/image";
import logoFull from "@/public/logo/logoFull.png";
import { COLOR } from "@/constant";
import MenuComponent from "../menu";

const { Header } = Layout;

const DrawerComponent: React.FC = () => {
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
        style={{ color: COLOR.PRIMARY, backgroundColor: "#fff", marginTop: "0.8rem" }}
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
                    justifyContent: "center",
                  }}
                >
                  <Image width={165} height={30} src={logoFull} alt="Logo" />
                </Col>
              </Header>
            </Row>
          </>
        }
        placement="left"
        closable={false}
        onClose={onClose}
        open={open}
        style={{ width: "80vw" }}
      >
        <MenuComponent responsive={true} defaultSelectedKeys={["1"]} open={open} setOpen={setOpen} />
      </Drawer>
    </>
  );
};

export default DrawerComponent;
