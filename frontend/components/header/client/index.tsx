import React from "react";
import { Layout, Row, Col, Space } from "antd";
import DrawerComponent from "../../drawer";
import AvatarComponent from "../../dropdown/avatar";
import NotificationComponent from "../../dropdown/notification";
import LangComponent from "../../dropdown/lang";
import SettingComponent from "../../dropdown/setting";
import logoFull from "@/public/logo/logoFull.png";
import Image from "next/image";
import { getValueFromScreen, useScreenWidth } from "@/utils/screenUtils";

const { Header } = Layout;

const HeaderComponent = () => {
  const screenWidth = useScreenWidth();

  const extraSmall = true;
  const small = true;
  const medium = false;
  const large = false;
  const extraLarge = false;
  const extraExtraLarge = false;

  const responsive = getValueFromScreen(
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
          >
            <Space size="middle" style={{ display: "flex" }}>
              {responsive ? (
                <DrawerComponent />
              ) : (
                <>
                  <SettingComponent />{" "}
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
          >
            <Image width={200} height={50} src={logoFull} alt="Logo" />
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <Space size="middle">
              {!responsive ? (
                <>
                  <LangComponent />
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
