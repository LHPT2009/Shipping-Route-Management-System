"use client";
import React from "react";
import { KeyOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Divider, Typography, Checkbox, Flex } from "antd";
import { COLOR } from "@/constant";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./login.module.scss";

import * as yup from "yup";
import Paragraph from "antd/es/typography/Paragraph";

const { Title, Text } = Typography;

const LoginPage = () => {
  // Validate Yup
  const schema = yup
    .object({
      username: yup.string().required("Please enter your email"),
      password: yup.string().required("Please enter your password"),
    })
    .required();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (

    <Flex justify="center" align="center" style={{ minHeight: "100vh", width: "100vw" }}>
      <Form
        initialValues={{ remember: true }}
        style={{
          width: "35%",
          height: "40rem",
          padding: "3rem",
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
        }}>Welcome back</Title>

        <Paragraph style={{
          fontSize: "1.2rem",
          marginTop: "0.9rem"
        }}>Enter your details to get sign in to your account</Paragraph>

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
                placeholder={"Enter your email address"}
                prefix={<UserOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />}
                style={{ borderRadius: "0.5rem", height: "3.2rem", background: "white" }}
              />
            )}
          />
        </Form.Item>
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
        <Flex justify="space-between" align="flex-start">
          <Form.Item style={{display:"flex", alignItems: "flex-start"}}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Paragraph style={{
            fontSize: "0.95rem",
            fontWeight: 600,
            color: COLOR.PRIMARY,
            marginTop: "0.3rem"
          }}>Forgot password?</Paragraph>
        </Flex>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", borderRadius: "8px" }}
            size="large"
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Text>
            Or <Link href={"/auth/register"}>register now!</Link>
          </Text>
        </Form.Item>
        <Divider>
          <Title level={4}>Other</Title>
        </Divider>
        <Form.Item>
          <Button
            type="primary"
            className="login-form-button"
            style={{ width: "100%", borderRadius: "8px" }}
            size="large"
          >
            Login by Email
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

export default LoginPage;
