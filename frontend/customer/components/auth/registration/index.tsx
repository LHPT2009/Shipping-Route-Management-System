"use client";
import { COLOR } from "@/constant";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Typography, DatePicker, Flex, Checkbox } from "antd";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Paragraph from "antd/es/typography/Paragraph";
import { emailRegex } from "../../../utils/validation/email.regex";
import { passwordRegex } from "../../../utils/validation/password.regex";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks/hooks";
import { RootState } from "@/lib/store";

const { Text, Title } = Typography;

const RegisterComponent = () => {
  const screenWidth = UseScreenWidth();
  const dispatch = useAppDispatch();

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

  const schema = yup
    .object({
      username: yup
        .string()
        .required("Please enter your username"),

      email: yup
        .string()
        .matches(emailRegex, { message: "Please enter a valid email" })
        .required("Please enter your email"),

      password: yup
        .string()
        .matches(passwordRegex, { message: "Please enter a stronger password (Min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit)" })
        .required("Please enter your password"),

      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Confirm password must match password")
        .required("Please enter your confirm password"),
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

    <Flex justify="center" align="center" style={{ minHeight: !responsive ? "100vh" : "auto", width: "100vw" }}>
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        style={{
          width: "35rem",
          height: "auto",
          padding: "3rem 3rem 1rem 3rem",
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
        }}>Create your account</Title>

        <Paragraph style={{
          fontSize: "1.1rem",
          marginTop: "0.9rem"
        }}>Fill out the form below to get started using S-Routing</Paragraph>

        {/* Username */}
        <Form.Item
          label="Username"
          name="username"
          style={{ paddingBottom: errors.username ? "1rem" : 0, marginBottom: "1.2rem", marginTop: "2rem" }}
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
                placeholder={"Enter your username"}
                prefix={<UserOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />}
                style={{ borderRadius: "0.5rem", height: "3.2rem", background: "white" }}
              />
            )}
          />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          style={{ paddingBottom: errors.email ? "1rem" : 0, marginBottom: "1.2rem" }}
          help={
            errors.email && (
              <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.email?.message}</span>
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
                placeholder={"Enter your email"}
                prefix={<MailOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />}
                style={{ borderRadius: "0.5rem", height: "3.2rem", background: "white" }}
              />
            )}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label="Password"
          name="password"
          style={{ paddingBottom: errors.password ? "1rem" : 0, marginBottom: "1.2rem" }}
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
                style={{ borderRadius: "0.5rem", height: "3.2rem", background: "white" }}
              />
            )}
          />
        </Form.Item>


        {/* Confirm Password */}
        <Form.Item
          label="Confirm password"
          name="confirmPassword"
          style={{ paddingBottom: errors.confirmPassword ? "1rem" : 0, marginBottom: "1.2rem" }}
          help={
            errors.confirmPassword && (
              <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.confirmPassword?.message}</span>
            )
          }
        >
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <Input.Password
                key="confirmPassword"
                type="password"
                {...field}
                placeholder={"Enter your password again"}
                prefix={<LockOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />}
                style={{ borderRadius: "0.5rem", height: "3.2rem", background: "white" }}
              />
            )}
          />
        </Form.Item>

        <Form.Item style={{ display: "flex", alignItems: "flex-start", marginTop: "1.5rem" }}>
          <Checkbox>
            I understand and agree to {" "}
            <span style={{ color: COLOR.PRIMARY, fontWeight: 500 }}>Terms</span> and {" "}
            <span style={{ color: COLOR.PRIMARY, fontWeight: 500 }}>Privacy Policy </span>
          </Checkbox>
        </Form.Item>

        {/* Button register*/}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", borderRadius: "0.5rem", height: "2.8rem", marginTop: "1rem" }}
          >
            Register
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center", marginTop: "2rem" }}>
          <Text style={{ fontSize: "0.95rem", color: "grey" }}>
            Already have an account? {" "}
            <Link href={"/auth/login"} style={{ color: COLOR.PRIMARY, fontWeight: 500 }}>Login</Link>
          </Text>
        </Form.Item>
      </Form>
    </Flex>

    // <DatePicker
    //   {...field}
    //   style={{ width: "50%", borderRadius: "8px" }}
    //   placeholder="Birthday..."
    // />

  );
};

export default RegisterComponent;
