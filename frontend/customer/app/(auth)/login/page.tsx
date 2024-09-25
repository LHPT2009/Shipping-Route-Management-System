"use client";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Divider, Typography, Checkbox, Flex } from "antd";
import { COLOR } from "@/constant";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GoogleImg from "../../../public/images/login/google.png"

import * as yup from "yup";
import Paragraph from "antd/es/typography/Paragraph";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import { URL } from "@/constant/url";
import useAntNotification from "@/lib/hooks/notification";
import { ApolloError, useMutation } from "@apollo/client";
import { LOGIN, LOGIN_WITH_GOOGLE } from "@/apollo/mutations/auth";
import { NOTIFICATION } from "@/constant/notification";
import { usernameEmailRegex } from "@/utils/validation/username-email.regex";
import { setCookies } from "@/utils/cookies/handle.cookies";
import { useRouter } from "next/navigation";
import { useHandleError } from "@/lib/hooks/error";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { authActions } from "@/lib/store/auth";
import { useGoogleLogin } from "@react-oauth/google";

const { Title, Text } = Typography;

const LoginPage = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const screenWidth = UseScreenWidth();
  const responsive: boolean = GetValueFromScreen(screenWidth, true, true, true, true);

  // Validate Yup
  const schema = yup
    .object({
      username: yup
        .string()
        .matches(usernameEmailRegex, "Please enter a valid username or email")
        .required("Please enter your username"),
      password: yup
        .string()
        .required("Please enter your password"),
    })
    .required();

  //useFrom hook
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { openNotificationWithIcon, contextHolder } = useAntNotification();
  const { handleError } = useHandleError();

  const [loginMutation, { loading }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      await setCookies('accessToken', data.login.data.accessToken);
      await setCookies('expiresIn', data.login.data.expiresIn);
      dispatch(authActions.setIsLogin(true));
      router.push('/');
      openNotificationWithIcon('success', NOTIFICATION.CONGRATS, "Login successfully");
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const [loginWithGooleMutation] = useMutation(LOGIN_WITH_GOOGLE, {
    onCompleted: async (data) => {
      await setCookies('accessToken', data.loginWithGoogle.data.accessToken);
      await setCookies('expiresIn', data.loginWithGoogle.data.expiresIn);
      dispatch(authActions.setIsLogin(true));
      router.push('/');
      openNotificationWithIcon('success', NOTIFICATION.CONGRATS, "Login successfully");
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const onFinish = async (values: any) => {
    await loginMutation({
      variables: {
        input: {
          email: values.username,
          password: values.password,
        }
      },
    });
  };

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      await loginWithGooleMutation({
        variables: {
          input: {
            token: tokenResponse.access_token
          }
        },
      });
    },
    onError: error => openNotificationWithIcon('error', NOTIFICATION.ERROR, "Fail to login with Google. Please try again or login with another account."),
  });

  return (
    <Flex justify="center" align="center"
      style={{
        minHeight: "100vh",
        width: "100vw"
      }}
    >
      {contextHolder}
      <Form
        initialValues={{ remember: true }}
        style={{
          width: responsive ? "90%" : "35rem",
          padding: responsive ? "3rem 2rem 1rem 2rem" : "3rem 3rem 1rem 3rem",
          margin: "2rem 0",
          borderRadius: "1rem",
          backgroundColor: COLOR.BACKGROUNDBODY,
          textAlign: "left",
        }}
        onFinish={handleSubmit(onFinish)}
      >
        <Title style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          color: COLOR.TEXT,
          marginBottom: 0
        }}>Welcome back !</Title>

        <Paragraph style={{
          fontSize: "1.1rem",
          marginTop: "0.9rem"
        }}>Enter your details to get sign in to your account</Paragraph>

        {/* Email */}
        <Form.Item
          name="username"
          style={{ paddingBottom: errors.username ? "1rem" : 0, marginTop: "2.7rem" }}
          help={
            errors.username && (
              <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.username?.message}</span>
            )
          }
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                key="username"
                {...field}
                placeholder={"Enter your username or email"}
                prefix={<UserOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />}
                style={{ borderRadius: "0.5rem", height: "3.2rem", background: "white" }}
              />
            )}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          style={{ paddingBottom: errors.password ? "1rem" : 0 }}
          help={
            errors.password && (
              <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.password?.message}</span>
            )
          }
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input.Password
                key="password"
                {...field}
                placeholder={"Enter your password"}
                prefix={<LockOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />}
                type="password"
                style={{ borderRadius: "0.5rem", height: "3.2rem", paddingRight: "1rem", background: "white" }}
              />
            )}
          />
        </Form.Item>

        {/* Remember me */}
        <Flex justify="flex-end" align="center" style={{ marginTop: 0, padding: 0, width: "100%" }}>
          <Link href={"/forgot-password"} style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: COLOR.PRIMARY,
          }}>Forgot password?</Link>
        </Flex>

        {/* Button login*/}
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", borderRadius: "0.5rem", height: "2.8rem", marginTop: "1.5rem" }}
          >
            Log in
          </Button>
        </Form.Item>

        <Divider style={{ borderColor: '#adb5bd', padding: "0 6rem", margin: 0 }} plain>
          Or
        </Divider>

        <Form.Item>
          <Button
            onClick={() => googleLoginHandler()}
            className="login-form-button"
            style={{ width: "100%", borderRadius: "0.5rem", height: "2.8rem", marginTop: "1.2rem", background: "white" }}
          >
            <Flex justify="center" align="center">
              <img src={GoogleImg.src} alt="Google" style={{ width: "1.3rem", height: "1.3rem", marginRight: "0.8rem" }} />
              Continue with Google
            </Flex>
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center", marginTop: "2.8rem" }}>
          <Text style={{ fontSize: "0.95rem", color: "grey" }}>
            Don't have an account? {" "}
            <Link href={URL.REGISTER} style={{ color: COLOR.PRIMARY, fontWeight: 500 }}>Register now</Link>
          </Text>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginPage;