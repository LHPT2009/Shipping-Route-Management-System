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
import { emailRegex } from "../../../../utils/validation/email.regex";
import { passwordRegex } from "../../../../utils/validation/password.regex";
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { authActions, ForgotPasswordStatus } from "../../../../lib/store/auth";

const { Text, Title } = Typography;

const EnterEmailComponent = () => {
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
      email: yup
        .string()
        .matches(emailRegex, { message: "Please enter a valid email" })
        .required("Please enter your email"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onFinish = (values: any) => {
    dispatch(authActions.changeForgotPasswordStatus(ForgotPasswordStatus.VERIFY));
    dispatch(authActions.setForgotpasswordEmail(values.email));
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
        }}>Forgot password</Title>

        <Paragraph style={{
          fontSize: "1.1rem",
          marginTop: "0.9rem"
        }}>No worries! We'll send you reset instructions. Please enter the email linked to your account.</Paragraph>

        {/* Email */}
        <Form.Item
          name="email"
          style={{ paddingBottom: errors.email ? "1rem" : 0, marginBottom: "1.2rem", marginTop: "2rem" }}
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

        {/* Button register*/}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", borderRadius: "0.5rem", height: "2.8rem", marginTop: "1.5rem" }}
          >
            Next
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center", marginTop: "2rem" }}>
          <Text style={{ fontSize: "0.95rem", color: "grey" }}>
            <Link href={"/auth/login"} style={{color: COLOR.PRIMARY}}>Back to Login</Link>
          </Text>
        </Form.Item>
      </Form>
    </Flex>

  );
};

export default EnterEmailComponent;
