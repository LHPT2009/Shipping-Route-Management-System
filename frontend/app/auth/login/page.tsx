"use client";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Divider, Typography, Checkbox } from "antd";
import { COLOR } from "@/constant";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";


const { Title, Text } = Typography;

const LoginPage = () => {

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

  // Validate Yup
  const schema = yup
    .object({
      username: yup
        .string()
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

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Flex justify="center" align="center" style={{ minHeight: !responsive ? "100vh" : "auto", width: "100vw" }}>
      <Form
        initialValues={{ remember: true }}
        style={{
          width: "35rem",
          padding: "3rem 3rem 1rem 3rem",
          margin: "2rem 0",
          borderRadius: "1rem",
          backgroundColor: COLOR.BACKGROUNDBODY,
          textAlign: "left",
        }}
      >
        <Form
          initialValues={{ remember: true }}
          style={{
            width: "500px",
            height: "550px",
            padding: "24px",
            margin: "24px",
            borderRadius: "8px",
            backgroundColor: COLOR.BACKGROUNDBODY,
          }}
          onFinish={handleSubmit(onFinish)}
        >
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <Title level={1}>Login</Title>
          </Form.Item>
          <Form.Item
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
            help={
              errors.username && (
                <span style={{ color: "red" }}>{errors.password?.message}</span>
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
                  placeholder={"Password..."}
                  prefix={<LockOutlined />}
                  type="password"
                  style={{ borderRadius: "8px" }}
                  size="large"
                />
              )}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
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
            <Title level={4}>Order</Title>
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
      </div>
    </>
  );
};

export default LoginPage;
