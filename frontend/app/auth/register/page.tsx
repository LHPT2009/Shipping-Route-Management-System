"use client";
import { COLOR } from "@/constant";
import { getValueFromScreen, useScreenWidth } from "@/utils/screenUtils";
import {
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Row, Col, Form, Input, Button, Typography, DatePicker } from "antd";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const { Text, Title } = Typography;

const registerPage = () => {
  const screenWidth = useScreenWidth();

  const extraSmall = true;
  const small = true;
  const medium = false;
  const large = false;
  const extraLarge = false;
  const extraExtraLarge = false;

  const responsive = getValueFromScreen(
    screenWidth,
    extraSmall,
    small,
    medium,
    large,
    extraLarge,
    extraExtraLarge
  );

  const schema = yup
    .object({
      username: yup.string().required("Required Username!!!"),
      password: yup.string().required("Required Password!!!"),
      rePassword: yup.string().required("Required RePassword!!!"),
      fullname: yup.string().required("Required Fullname!!!"),
      birthday: yup.string().required("Required Birthday!!!"),
      phoneNumber: yup.string().required("Required PhoneNumber!!!"),
      email: yup.string().required("Required Email!!!"),
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
          height: !responsive ? "83vh" : "auto",
          width: "100vw",
        }}
      >
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          style={{
            width: "1000px",
            height: "auto",
            padding: "24px",
            margin: "24px",
            borderRadius: "8px",
            backgroundColor: COLOR.BACKGROUNDBODY,
          }}
          size="large"
          onFinish={handleSubmit(onFinish)}
        >
          <Row gutter={[16, 16]}>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              xxl={24}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Title level={1}>Register</Title>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="Username"
                name="username"
                help={
                  errors.username && (
                    <span style={{ color: "red" }}>
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
                      placeholder={"Username..."}
                      prefix={<UserOutlined />}
                      style={{ width: "100%", borderRadius: "8px" }}
                      size="large"
                    />
                  )}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                help={
                  errors.password && (
                    <span style={{ color: "red" }}>
                      {errors.password?.message}
                    </span>
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
                      style={{ width: "100%", borderRadius: "8px" }}
                      size="large"
                    />
                  )}
                />
              </Form.Item>
              <Form.Item
                label="RePassword"
                name="rePassword"
                help={
                  errors.password && (
                    <span style={{ color: "red" }}>
                      {errors.rePassword?.message}
                    </span>
                  )
                }
              >
                <Controller
                  name="rePassword"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      key="rePassword"
                      {...field}
                      placeholder={"RePassword..."}
                      prefix={<LockOutlined />}
                      style={{ width: "100%", borderRadius: "8px" }}
                      size="large"
                    />
                  )}
                />
              </Form.Item>
              <Form.Item
                label="Fullname"
                name="fullname"
                help={
                  errors.fullname && (
                    <span style={{ color: "red" }}>
                      {errors.fullname?.message}
                    </span>
                  )
                }
              >
                <Controller
                  name="fullname"
                  control={control}
                  render={({ field }) => (
                    <Input
                      key="fullname"
                      {...field}
                      placeholder={"Fullname..."}
                      style={{ width: "100%", borderRadius: "8px" }}
                      size="large"
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item
                label="Birthday"
                name="birthday"
                help={
                  errors.birthday && (
                    <span style={{ color: "red" }}>
                      {errors.birthday?.message}
                    </span>
                  )
                }
              >
                <Controller
                  name="birthday"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      style={{ width: "50%", borderRadius: "8px" }}
                      placeholder="Birthday..."
                    />
                  )}
                />
              </Form.Item>
              <Form.Item
                label="PhoneNumber"
                name="phoneNumber"
                help={
                  errors.phoneNumber && (
                    <span style={{ color: "red" }}>
                      {errors.phoneNumber?.message}
                    </span>
                  )
                }
              >
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <Input
                      key="phoneNumber"
                      {...field}
                      placeholder={"PhoneNumber..."}
                      prefix={<PhoneOutlined />}
                      style={{ width: "100%", borderRadius: "8px" }}
                      size="large"
                    />
                  )}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                help={
                  errors.email && (
                    <span style={{ color: "red" }}>
                      {errors.email?.message}
                    </span>
                  )
                }
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      key="email"
                      {...field}
                      placeholder={"Email..."}
                      prefix={<MailOutlined />}
                      style={{ width: "100%", borderRadius: "8px" }}
                      size="large"
                    />
                  )}
                />
              </Form.Item>

              <Form.Item label="Click here to complete">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", borderRadius: "8px" }}
                >
                  Submit
                </Button>
                <Text>
                  {" "}
                  back <Link href="/auth/login">login now!</Link>
                </Text>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default registerPage;
