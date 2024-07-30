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
    <>
      <Row>
        <Header
          style={{
            position: "sticky",
            zIndex: 100,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Col span={6}>
            {responsive ? (
              <DrawerComponent />
            ) : (
              <>
                <Image width={200} height={50} src={logoFull} alt="Logo" />
              </>
            )}
          </Col>
          
          <Col span={12}>
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
                  <Image width={200} height={50} src={logoFull} alt="Logo" />
                </>
              )}
            </Flex>
          </Col>

          <Col span={6}>
            <Flex justify='end' align='end' >
              <Space size="large" style={{marginTop: "8px"}}>
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
      </Row>
    </>
  );
};

export default HeaderComponent;
