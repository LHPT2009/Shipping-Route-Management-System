"use client";
import { COLOR } from "@/constant";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import {
  MailOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Typography, Flex } from "antd";
import Link from "next/link";
import { Controller, set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Paragraph from "antd/es/typography/Paragraph";
import { emailRegex } from "@/utils/validation/email.regex";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { RESET_PASSWORD_VERIFY_EMAIL } from "@/apollo/mutations/auth";
import { ApolloError, useMutation } from "@apollo/client";
import { NOTIFICATION } from "@/constant/notification";
import CountdownTimer from "@/components/countdown";
import { useState } from "react";

const { Text, Title } = Typography;

const ForgotPasswordPage = () => {
  const screenWidth = UseScreenWidth();
  const responsive: boolean = GetValueFromScreen(screenWidth, true, true, true, true);
  const [isCountdown, setIsCountdown] = useState<boolean>(false);
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

  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [resetPasswordVerifyMutation, { data, loading }] = useMutation(RESET_PASSWORD_VERIFY_EMAIL, {
    onCompleted: () => {
      openNotificationWithIcon('success', NOTIFICATION.CONGRATS, "Please check your email for the password reset link. If you don’t receive an email, use the \"Resend\" button to request a new one.");
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const onFinish = async (values: any) => {
    setIsCountdown(true);
    await resetPasswordVerifyMutation({
      variables: {
        input: {
          email: values.email,
        }
      },
    });
  };

  const handleCountdownComplete = () => {
    setIsCountdown(false);
  };

  return (

    <Flex justify="center" align="center" style={{ minHeight: "100vh", width: "100vw" }}>
      <Form
        layout="vertical"
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
        }}>Forgot password</Title>

        <Paragraph style={{
          fontSize: "1.1rem",
          marginTop: "0.9rem"
        }}>No worries! We&apos;ll send you reset instructions. Please enter the email linked to your account.</Paragraph>

        {/* Email */}
        <Form.Item
          name="email"
          style={{ paddingBottom: errors.email ? "1rem" : 0, marginBottom: "1.2rem", marginTop: "1.7rem" }}
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
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", borderRadius: "0.5rem", height: "2.8rem", marginTop: "1.3rem" }}
          >
            Submit
          </Button>
        </Form.Item>

        {!data ? null :
          <Paragraph
            style={{
              fontSize: "1rem",
              marginTop: "2rem",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Didn&apos;t receive the email?{" "}
            {isCountdown ? <CountdownTimer totalSec={60} onComplete={handleCountdownComplete} /> :
              <Button type="link" htmlType="submit" style={{ color: COLOR.PRIMARY, fontWeight: "600", padding: 0 }}>
                Click here to resend
              </Button>}
          </Paragraph>}

        <Form.Item style={{ textAlign: "center" }}>
          <Text style={{ fontSize: "0.95rem", color: "grey" }}>
            <Link href={"/login"} style={{ color: COLOR.PRIMARY }}>Back to Login</Link>
          </Text>
        </Form.Item>
      </Form>
    </Flex>

  );
};

export default ForgotPasswordPage;
