"use client";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Divider, Typography, Checkbox } from "antd";
import { COLOR } from "@/constant";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const { Title, Text } = Typography;

const loginPage = () => {
  // Validate Yup
  const schema = yup
    .object({
      username: yup.string().required("Required Username!!!"),
      password: yup.string().required("Required Password!!!"),
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
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "83vh",
          width: "100vw",
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
            help={
              errors.username && (
                <span style={{ color: "red" }}>{errors.username?.message}</span>
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
                  placeholder={"Username..."}
                  prefix={<UserOutlined />}
                  style={{ borderRadius: "8px" }}
                  size="large"
                />
              )}
            />
          </Form.Item>
          <Form.Item
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

export default loginPage;
