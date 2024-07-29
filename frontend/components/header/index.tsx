import React from "react";
import { Layout, Row, Col, Space } from "antd";
import DrawerComponent from "../drawer";
import AvatarComponent from "../dropdown/avatar";
import NotificationComponent from "../dropdown/notification";
import logoFull from "@/public/logo/logoFull.png";
import Image from "next/image";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import MenuComponent from "../menu";

const { Header } = Layout;

const HeaderComponent = () => {
  const screenWidth = UseScreenWidth();

  const extraSmall = true;
  const small = true;
  const medium = false;
  const large = false;
  const extraLarge = false;
  const extraExtraLarge = false;

  const responsive = GetValueFromScreen(
    screenWidth,
    extraSmall,
    small,
    medium,
    large,
    extraLarge,
    extraExtraLarge
  );

  return (
    <>
      <Row>
        <Header
          style={{
            position: "sticky",
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              width: "100%",
            }}
            span={6}
          >
            <Space size="middle" style={{ display: "flex" }}>
              {responsive ? (
                <DrawerComponent />
              ) : (
                <>
                  <Image width={200} height={50} src={logoFull} alt="Logo" />
                </>
              )}
            </Space>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
            span={12}
          >
            {!responsive ? (
              <>
                <MenuComponent
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                  responsive={responsive}
                />
              </>
            ) : (
              <>
                <Image width={200} height={50} src={logoFull} alt="Logo" />
              </>
            )}
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              width: "100%",
              top: "5px",
            }}
            span={6}
          >
            <Space size="middle">
              {!responsive ? (
                <>
                  <NotificationComponent />
                </>
              ) : (
                <></>
              )}

              <AvatarComponent />
            </Space>
          </Col>
        </Header>
      </Row>
    </>
  );
};

export default HeaderComponent;
