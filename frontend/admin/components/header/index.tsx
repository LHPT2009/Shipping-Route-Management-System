"use client";

import React from "react";
import { Avatar, Col, Flex, Layout, Row, theme, Typography } from "antd";
import NotificationComponent from "../dropdown/notification";
import AvatarComponent from "../dropdown/avatar";
import { COLOR } from "@/constant";
import { useAppSelector } from "@/lib/hooks/hooks";
import { LeftCircleOutlined } from "@ant-design/icons";

const { Header } = Layout;

const { Title, Text } = Typography;

const HeaderComponent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const checkStatusResponse: boolean = useAppSelector(state => state.responsive.checkStatusResponse)
  const checkStatusBackground: boolean = useAppSelector(state => state.responsive.checkStatusBackground)
  const getlabelMenu: string = useAppSelector(state => state.menu.labelMenu)

  return (
    <>
      {!checkStatusBackground ? <>
        <Header
          style={{
            margin: "16px 16px 10px 16px",
            padding: checkStatusResponse ? "0 16px 155px 16px" : "0 16px 0 16px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: "calc(100vh - 30px)",
          }}
        >
        </Header>
      </> : <>
        <Header
          style={{
            margin: "16px 16px 10px 16px",
            padding: checkStatusResponse ? "0 16px 155px 16px" : "0 16px 0 16px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Row style={{ width: "100%" }}>
            <Col xs={16} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <div
                style={{
                  padding: "16px 0px",
                }}
              >
                <Flex justify="start" align="start" gap="small">
                  <Avatar
                    shape="circle"
                    size="large"
                    icon={<LeftCircleOutlined  />}
                    style={{ color: COLOR.PRIMARY, backgroundColor: "#fff" }}
                  />
                  <Title level={3}>{getlabelMenu}</Title>
                </Flex>
              </div>
            </Col>
            <Col xs={8} sm={12} md={6} lg={6} xl={6} xxl={6}>
              <div
                style={{
                  padding: "20px 0px",
                  marginRight:"20px"
                }}
              >
                <Flex justify="end" align="end" gap="small">
                  <NotificationComponent />
                </Flex>
              </div>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
              <div
                style={{
                  padding: "11px 0px",
                  borderLeft: checkStatusResponse ? "" : "5px solid",
                  borderColor: checkStatusResponse ? "" : COLOR.PRIMARY,
                }}
              >
                <Flex justify="end" align="end" gap="small">
                  <Flex justify="end" align="end" vertical>
                    <Text strong>Lê Huỳnh Phương Tùng</Text>
                    <Text type="secondary">Admin</Text>
                  </Flex>
                  <Flex style={{ marginBottom: "2px" }}>
                    <AvatarComponent />
                  </Flex>
                </Flex>
              </div>
            </Col>
          </Row>
        </Header>
      </>}
    </>
  );
};

export default HeaderComponent;
