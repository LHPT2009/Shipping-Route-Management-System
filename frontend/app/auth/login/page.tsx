"use client";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Divider, Typography, Checkbox } from "antd";
import { COLOR } from "@/constant";
import Link from "next/link";

const { Title, Text } = Typography;

const loginPage = () => {
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
            height: "500px",
            padding: "24px",
            margin: "24px",
            borderRadius: "8px",
            backgroundColor: COLOR.BACKGROUNDBODY,
          }}
          onFinish={onFinish}
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
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              style={{ borderRadius: "8px" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              style={{ borderRadius: "8px" }}
              size="large"
            />
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
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default loginPage;
