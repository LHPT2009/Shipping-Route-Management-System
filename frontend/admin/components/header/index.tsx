"use client";

import React from "react";
import { Avatar, Col, Flex, Layout, Row, theme, Typography } from "antd";
import NotificationComponent from "../dropdown/notification";
import AvatarComponent from "../dropdown/avatar";
import { COLOR } from "@/constant";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { LeftCircleOutlined, MoonOutlined } from "@ant-design/icons";
import { deleteCookies, getCookies } from "@/utils/cookies/handle.cookies";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { LOGOUT } from "@/apollo/query/auth";
import { useHandleError } from "@/lib/hooks/error";
import { authActions } from "@/lib/store/auth";
import LogoutIcon from "../../public/svg/homepage/logout.svg";
import NotiIcon from "../../public/svg/homepage/noti.svg";
import Male from "../../public/images/homepage/male.png"
import Link from "next/link";
import Paragraph from "antd/es/typography/Paragraph";

const { Header } = Layout;

const { Title, Text } = Typography;

const HeaderComponent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const checkStatusResponse: boolean = useAppSelector(state => state.responsive.checkStatusResponse)
  const checkStatusBackground: boolean = useAppSelector(state => state.responsive.checkStatusBackground)
  const getlabelMenu: string = useAppSelector(state => state.menu.labelMenu)

  const { handleError } = useHandleError();
  const dispatch = useAppDispatch();

  const [logout] = useLazyQuery(LOGOUT, {
    onCompleted: async (data) => {
      await deleteCookies('accessToken');
      await deleteCookies('expiresIn');
      dispatch(authActions.setIsLogin(false));
      window.location.reload();
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const logoutHandler = async () => {
    const accessToken = await getCookies('accessToken');
    await logout({
      context: {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }
    });
  };

  return (
    <div style={{ width: "100%", position: "fixed", zIndex: 100, paddingTop: 0, margin: "0 0 0 12.5rem", paddingRight: "12.5rem" }}>
      {!checkStatusBackground ? <>
        <Header
          style={{
            margin: "0 16px 10px 16px",
            padding: checkStatusResponse ? "0 16px 155px 16px" : "0 16px 0 16px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: "calc(100vh - 30px)",
          }}
        >
        </Header>
      </> :
        <div style={{ background: "#f8f9fa", padding: "16px 16px 16px 16px " }}>
          <Header
            style={{
              padding: checkStatusResponse ? "0 16px 155px 16px" : "0 16px 0 16px",
              background: colorBgContainer,
              borderRadius: "0.5rem",
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
                    {/* <Avatar
                    shape="circle"
                    size="large"
                    icon={<LeftCircleOutlined  />}
                    style={{ color: COLOR.PRIMARY, backgroundColor: "#fff" }}
                  /> */}
                    <Title level={4} style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: COLOR.TEXT,
                      paddingLeft: "0.5rem"
                    }}>
                      {getlabelMenu === "Dashboard" ? "Dashboard" : `${getlabelMenu} management`}
                    </Title>
                    {/* <Title level={3}>{getlabelMenu}</Title> */}
                  </Flex>
                </div>
              </Col>
              <Col xs={8} sm={12} md={6} lg={6} xl={6} xxl={6}>
                <div
                  style={{
                    padding: "20px 0px",
                    marginRight: "20px"
                  }}
                >
                  <Flex justify="end" align="end" gap="1.5rem" style={{ paddingRight: "1rem" }}>
                    <img src={NotiIcon.src} alt="logout" style={{ width: "1.35rem", cursor: "pointer" }} />
                    <img onClick={logoutHandler} src={LogoutIcon.src} alt="logout" style={{ width: "1.5rem", cursor: "pointer" }} />
                  </Flex>
                </div>
              </Col>
              <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                <div
                  style={{
                    padding: "11px 0px",
                    borderLeft: checkStatusResponse ? "" : "1px solid",
                    borderColor: checkStatusResponse ? "" : "#dee2e6",
                  }}
                >
                  <Flex justify="flex-end" align="center" gap="1rem">
                    <Flex align="flex-end" vertical>
                      <Paragraph
                        style={{
                          fontSize: "1rem",
                          marginBottom: "0",
                          fontWeight: 500,
                          color: COLOR.TEXT
                        }}
                      >
                        Lê Huỳnh Phương Tùng
                      </Paragraph>
                      <Paragraph
                        style={{
                          fontSize: "0.85rem",
                          marginBottom: "0",
                          color: "#868e96"
                        }}
                      >
                        Admin
                      </Paragraph>
                    </Flex>

                    <Link href="/profile">
                      <img style={{ width: "3rem", borderRadius: "50%" }} src={Male.src} alt="tung" />
                    </Link>

                  </Flex>
                </div>
              </Col>
            </Row>
          </Header>
        </div>
      }
    </div>
  );
};

export default HeaderComponent;
