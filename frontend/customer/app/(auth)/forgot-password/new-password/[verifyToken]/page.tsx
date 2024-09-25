"use client";
import { COLOR } from "@/constant";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import {
  LockOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Typography, Flex } from "antd";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Paragraph from "antd/es/typography/Paragraph";
import { passwordRegex } from "@/utils/validation/password.regex";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { ApolloError, useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "@/apollo/mutations/auth";
import { NOTIFICATION } from "@/constant/notification";
import { VerifyType } from "@/components/auth/verification";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const { Text, Title } = Typography;

interface VerifyAccountProps {
  params: any; // Replace 'any' with the appropriate type for the 'params' property
}

const NewPasswordPage: React.FC<VerifyAccountProps> = ({params}) => {
  const screenWidth = UseScreenWidth();
  const router = useRouter();

  const responsive = GetValueFromScreen(screenWidth, true, true, true, true);

  const schema = yup
    .object({
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
  
  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [resetPassword, {loading}] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      openNotificationWithIcon('success', NOTIFICATION.CONGRATS, "Your password has been reset successfully. Please login again with your new password.");
      router.push("/login");
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const onFinish = async (values: any) => {
    await resetPassword({
      variables: {
        input: {
          verifyToken: params.verifyToken,
          newPassword: values.password,
          passwordConfirm: values.confirmPassword
        }
      },
    });
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
        }}>Update your password</Title>

        <Paragraph style={{
          fontSize: "1.1rem",
          marginTop: "0.9rem"
        }}>Set a new password to access your account</Paragraph>

        {/* Password */}
        <Form.Item
          label="New password"
          name="password"
          style={{ paddingBottom: errors.password ? "1rem" : 0, marginBottom: "1.2rem", marginTop: "2rem" }}
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

        {/* Button register*/}
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", borderRadius: "0.5rem", height: "2.8rem", marginTop: "2rem" }}
          >
            Confirm
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center", marginTop: "2rem" }}>
          <Text style={{ fontSize: "0.95rem", color: "grey" }}>
            <Link href={"/auth/login"} style={{ color: COLOR.PRIMARY }}>Back to Login</Link>
          </Text>
        </Form.Item>
      </Form>
    </Flex>

  );
};

export default NewPasswordPage;
