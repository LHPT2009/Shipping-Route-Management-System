"use client";
import ContentComponent from "@/components/content";
import { Col, Form, Row, Input, Button, Typography, Flex } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomModal from "@/components/modal/route";

const { Text } = Typography;
const routeDetailPage = () => {
  const schema = yup
    .object({
      username: yup.string().required("Please enter your username"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onFinish = async (values: any) => {
    console.log(values);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ContentComponent>
        <Form onFinish={handleSubmit(onFinish)} layout="vertical">
          <Text>Detail info</Text>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Item
                    label="Username"
                    name="username"
                    style={{
                      paddingBottom: errors.username ? "1rem" : 0,
                      marginBottom: "1.2rem",
                      marginTop: "2rem",
                    }}
                    help={
                      errors.username && (
                        <span style={{ color: "red", fontSize: "0.9rem" }}>
                          {errors.username?.message}
                        </span>
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
                          placeholder={"Enter your username"}
                          prefix={
                            <UserOutlined
                              style={{ padding: "0 0.5rem 0 0.25rem" }}
                            />
                          }
                          style={{
                            borderRadius: "0.5rem",
                            height: "3.2rem",
                            background: "white",
                          }}
                        />
                      )}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Username"
                    name="username"
                    style={{
                      paddingBottom: errors.username ? "1rem" : 0,
                      marginBottom: "1.2rem",
                      marginTop: "2rem",
                    }}
                    help={
                      errors.username && (
                        <span style={{ color: "red", fontSize: "0.9rem" }}>
                          {errors.username?.message}
                        </span>
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
                          placeholder={"Enter your username"}
                          prefix={
                            <UserOutlined
                              style={{ padding: "0 0.5rem 0 0.25rem" }}
                            />
                          }
                          style={{
                            borderRadius: "0.5rem",
                            height: "3.2rem",
                            background: "white",
                          }}
                        />
                      )}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Username"
                    name="username"
                    style={{
                      paddingBottom: errors.username ? "1rem" : 0,
                      marginBottom: "1.2rem",
                      marginTop: "2rem",
                    }}
                    help={
                      errors.username && (
                        <span style={{ color: "red", fontSize: "0.9rem" }}>
                          {errors.username?.message}
                        </span>
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
                          placeholder={"Enter your username"}
                          prefix={
                            <UserOutlined
                              style={{ padding: "0 0.5rem 0 0.25rem" }}
                            />
                          }
                          style={{
                            borderRadius: "0.5rem",
                            height: "3.2rem",
                            background: "white",
                          }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Item
                    label="Username"
                    name="username"
                    style={{
                      paddingBottom: errors.username ? "1rem" : 0,
                      marginBottom: "1.2rem",
                      marginTop: "2rem",
                    }}
                    help={
                      errors.username && (
                        <span style={{ color: "red", fontSize: "0.9rem" }}>
                          {errors.username?.message}
                        </span>
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
                          placeholder={"Enter your username"}
                          prefix={
                            <UserOutlined
                              style={{ padding: "0 0.5rem 0 0.25rem" }}
                            />
                          }
                          style={{
                            borderRadius: "0.5rem",
                            height: "3.2rem",
                            background: "white",
                          }}
                        />
                      )}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Username"
                    name="username"
                    style={{
                      paddingBottom: errors.username ? "1rem" : 0,
                      marginBottom: "1.2rem",
                      marginTop: "2rem",
                    }}
                    help={
                      errors.username && (
                        <span style={{ color: "red", fontSize: "0.9rem" }}>
                          {errors.username?.message}
                        </span>
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
                          placeholder={"Enter your username"}
                          prefix={
                            <UserOutlined
                              style={{ padding: "0 0.5rem 0 0.25rem" }}
                            />
                          }
                          style={{
                            borderRadius: "0.5rem",
                            height: "3.2rem",
                            background: "white",
                          }}
                        />
                      )}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Username"
                    name="username"
                    style={{
                      paddingBottom: errors.username ? "1rem" : 0,
                      marginBottom: "1.2rem",
                      marginTop: "2rem",
                    }}
                    help={
                      errors.username && (
                        <span style={{ color: "red", fontSize: "0.9rem" }}>
                          {errors.username?.message}
                        </span>
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
                          placeholder={"Enter your username"}
                          prefix={
                            <UserOutlined
                              style={{ padding: "0 0.5rem 0 0.25rem" }}
                            />
                          }
                          style={{
                            borderRadius: "0.5rem",
                            height: "3.2rem",
                            background: "white",
                          }}
                        />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Flex justify="end" align="end" wrap gap="small">
                    <Button type="primary" size="large" htmlType="submit">
                      Primary
                    </Button>
                    <Button type="primary" size="large" htmlType="submit">
                      Primary
                    </Button>
                    <Button type="primary" size="large" onClick={handleOpen}>
                      Edit By Modal
                    </Button>
                  </Flex>
                </Col>
              </Row>
            </Col>

            <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
              <Text strong>map:</Text>
              <div style={{ height: "60vh", backgroundColor: "red" }}></div>
            </Col>
          </Row>
        </Form>
      </ContentComponent>
      <CustomModal open={open} onClose={handleClose} />
    </>
  );
};

export default routeDetailPage;
