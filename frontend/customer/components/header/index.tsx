'use client';

import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Space, Button, Divider } from "antd";
import DrawerComponent from "../drawer";
import logoFull from "@/public/logo/logoFull.png";
import Image from "next/image";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import MenuComponent from "../menu";
import { Flex } from 'antd';
import { useRouter } from "next/navigation";
import { URL } from "@/constant/url";
import { COLOR } from "@/constant";
import Link from "next/link";
import { fetchCookies } from "@/utils/token/fetch_cookies.token";
import Tung from "../../public/images/homepage/tung_2.jpg";
import Paragraph from "antd/es/typography/Paragraph";
import LogoutIcon from "../../public/svg/homepage/logout.svg";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { LOGOUT } from "@/apollo/query/auth";
import { deleteCookies, getCookies } from "@/utils/cookies/handle.cookies";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { NOTIFICATION } from "@/constant/notification";

const { Header } = Layout;

const HeaderComponent = () => {
  const screenWidth = UseScreenWidth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<Boolean>(false);

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

  useEffect(() => {
    const fetchCurrentCookies = async () => {
      const { accessToken, expiresIn } = await fetchCookies();
      if (accessToken && expiresIn) {
        setIsLogin(true);
      }
    };
    fetchCurrentCookies();
  }, []);

  const { openNotificationWithIcon, contextHolder } = useAntNotification();
  const { handleError } = useHandleError();

  const [logout] = useLazyQuery(LOGOUT, {
    onCompleted: async (data) => {
      await deleteCookies('accessToken');
      await deleteCookies('expiresIn');
      window.location.reload()
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
          accesstoken: accessToken
        }
      }
    });
  };

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

          {isLogin ?
            <Flex justify='end' align='center' gap="1rem">
              <div style={{ textAlign: "right" }}>
                <Paragraph
                  style={{
                    fontSize: "1rem",
                    marginBottom: "0",
                    fontWeight: 500,
                    color: COLOR.TEXT
                  }}
                >
                  Le Huynh Phuong Tung
                </Paragraph>
                <Paragraph
                  style={{
                    fontSize: "0.8rem",
                    marginBottom: "0",
                  }}
                >
                  Customer
                </Paragraph>
              </div>
              <Link href="/profile">
                <img style={{ width: "3rem", borderRadius: "50%" }} src={Tung.src} alt="tung" />
              </Link>
              <img onClick={logoutHandler} src={LogoutIcon.src} alt="logout" style={{ width: "1.5rem", cursor: "pointer" }} />
            </Flex>
            :
            <Flex justify='end' align='center'>
              <Button
                onClick={() => router.push(URL.LOGIN)}
                type="link"
                style={{
                  padding: "1.5rem 2rem",
                  border: "none",
                  fontWeight: 500,
                  color: COLOR.PRIMARY
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => router.push(URL.REGISTER)}
                type="primary"
                style={{
                  padding: "1.5rem 1.6rem",
                  border: "none",
                }}
              >
                Get started
              </Button>
            </Flex>
          }

        </Col>

      </Header>
    </div>
  );
};

export default HeaderComponent;