'use client';

import React from "react";
import { Layout, Col, Button } from "antd";
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
import Male from "../../public/images/homepage/male.png";
import Paragraph from "antd/es/typography/Paragraph";
import LogoutIcon from "../../public/svg/homepage/logout.svg";
import { ApolloError, useLazyQuery } from "@apollo/client";
import { LOGOUT } from "@/apollo/query/auth";
import { deleteCookies, getCookies } from "@/utils/cookies/handle.cookies";
import { useHandleError } from "@/lib/hooks/error";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { userActions, UserState } from "@/lib/store/user";
import { authActions } from "@/lib/store/auth";
import { menuActions } from "@/lib/store/menu";
const { Header } = Layout;

const HeaderComponent = () => {
  const screenWidth = UseScreenWidth();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const user: UserState = useAppSelector((state) => state.user);
  const isLogin: boolean = useAppSelector((state) => state.auth.isLogin);

  const responsive = GetValueFromScreen(screenWidth, true, true, true, true);

  const { handleError } = useHandleError();

  const [logout] = useLazyQuery(LOGOUT, {
    onCompleted: async (data) => {
      await deleteCookies('accessToken');
      await deleteCookies('expiresIn');
      dispatch(authActions.setIsLogin(false));
      dispatch(userActions.clearUserInformation());
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

  const clickHandler = async () => {
    const { accessToken, expiresIn } = await fetchCookies();
    if (accessToken && expiresIn) {
      router.push(URL.ROUTE);
    } else {
      router.push(URL.REGISTER);
    }
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
          padding: responsive ? "1rem" : "1rem 3rem",
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

        <Col span={responsive ? 0 : 12} style={{ marginBottom: "0.8rem" }}>
          <Flex justify='center' align='center' >

            {!responsive ? (
              <>
                <MenuComponent
                  mode="horizontal"
                  defaultSelectedKeys={["1"]}
                  responsive={responsive}
                  open={false}
                  setOpen={() => { }}
                />
              </>
            ) : (
              <></>
            )}

          </Flex>
        </Col>

        <Col span={responsive ? 18 : 6}>

          {isLogin ?
            <Flex justify='end' align='center' gap="1rem">
              <div style={{ textAlign: "right" }}>
                <Paragraph
                  style={{
                    fontSize: "1rem",
                    marginBottom: "0",
                    fontWeight: 500,
                    color: COLOR.TEXT,
                  }}
                >
                  {user.username}
                </Paragraph>
                <Paragraph
                  style={{
                    fontSize: "0.8rem",
                    marginBottom: "0",
                  }}
                >
                  {user.role}
                </Paragraph>
              </div>
              <Link href="/profile" onClick={() => {dispatch(menuActions.changeInfoMenu({keyMenu: ""}))}}>
                <img style={{ width: "3rem", height: "3rem", borderRadius: "50%" }} src={user.img !== "" ? user.img : Male.src} alt="tung" />
              </Link>
              <img onClick={logoutHandler} src={LogoutIcon.src} alt="logout" style={{ width: "1.5rem", cursor: "pointer" }} />
            </Flex>
            :
            <Flex justify='end' align='center'>
              <Button
                onClick={() => router.push(URL.LOGIN)}
                type="link"
                style={{
                  padding: responsive ? "1.3rem 1.8rem" : "1.5rem 2rem",
                  border: "none",
                  fontWeight: 500,
                  color: COLOR.PRIMARY,
                  fontSize: responsive ? "0.95rem" : "1rem",
                }}
              >
                Login
              </Button>
              <Button
                onClick={clickHandler}
                type="primary"
                style={{
                  padding: responsive ? "1.3rem 1.3rem" : "1.5rem 1.6rem",
                  fontSize: "0.95rem",
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