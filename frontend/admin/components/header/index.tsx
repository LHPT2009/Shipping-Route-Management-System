import React from "react";
import { Layout, Row, Col, Space } from "antd";
import DrawerComponent from "../drawer";
import AvatarComponent from "../dropdown/avatar";
import NotificationComponent from "../dropdown/notification";
import logoFull from "@/public/logo/logoFull.png";
import Image from "next/image";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import MenuComponent from "../menu";
import { Flex } from 'antd';


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
    <div>
      <Header
        style={{
          position: "fixed",
          zIndex: 100,
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "5.5rem",
          // padding: "1rem",
        }}
      >
        <Col span={6} style={{ marginBottom: "0.8rem" }}>
          {responsive ? (
            <DrawerComponent />
          ) : (
            <>
              <Image width={170} src={logoFull} alt="Logo" />
            </>
          )}
        </Col>

        <Col span={12} style={{ marginBottom: "0.8rem" }}>
          <Flex justify='center' align='center' >

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
                  <Image width={170} src={logoFull} alt="Logo" />
                </>
              )}
        
          </Flex>
        </Col>

        <Col span={6}>
          <Flex justify='end' align='end' >
            <Space size="large">
              {!responsive ? (
                <>
                  <NotificationComponent />
                </>
              ) : (
                <></>
              )}
              <AvatarComponent />
            </Space>
          </Flex>
        </Col>

      </Header>
    </div>
  );
};

export default HeaderComponent;