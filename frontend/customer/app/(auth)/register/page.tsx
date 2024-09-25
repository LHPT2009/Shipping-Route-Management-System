"use client";
import { COLOR } from "@/constant";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Form, Input, Button, Typography, Flex, Checkbox } from "antd";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Paragraph from "antd/es/typography/Paragraph";
import { emailRegex } from "../../../utils/validation/email.regex";
import { passwordRegex } from "../../../utils/validation/password.regex";
import { URL } from "@/constant/url";
import { ApolloError, useMutation } from "@apollo/client";
import useAntNotification from "@/lib/hooks/notification";
import { NOTIFICATION } from "@/constant/notification";
import { usernameRegex } from "@/utils/validation/username.regex";
import { SIGNUP } from "@/apollo/mutations/auth";
import { useHandleError } from "@/lib/hooks/error";
import { useRouter } from "next/navigation";

const { Text, Title } = Typography;

const RegisterPage = () => {

  const screenWidth = UseScreenWidth();
  const responsive = GetValueFromScreen(screenWidth, true, true, true, true);

  const schema = yup
    .object({
      username: yup
        .string()
        .matches(usernameRegex, { message: "Please enter a valid username" })
        .required("Please enter your username"),

      email: yup
        .string()
        .matches(emailRegex, { message: "Please enter a valid email" })
        .required("Please enter your email"),

      password: yup
        .string()
        .matches(passwordRegex, { message: "Please enter a stronger password (Min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit)" })
        .required("Please enter your password"),

      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], "Confirm password must match password")
        .required("Please enter your confirm password"),

      agreementConfirm: yup
        .boolean()
        .oneOf([true], "Please confirm to our terms and privacy policy")
        .required("Please confirm to our terms and privacy policy"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(schema) });

  const { openNotificationWithIcon, contextHolder } = useAntNotification();
  const { handleError } = useHandleError();
  const router = useRouter();

  const [signupMutation, { loading, error, data }] = useMutation(SIGNUP, {
    onCompleted() {
      reset({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      });
      openNotificationWithIcon('success', NOTIFICATION.CONGRATS, "Register successfully. Please check your email to verify your account.");
      router.push(URL.LOGIN);
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const onFinish = async (values: any) => {
    await signupMutation({
      variables: {
        input: {
          username: values.username,
          email: values.email,
          password: values.password,
          passwordConfirm: values.passwordConfirm
        }
      }
    });
  };

  return (

    <Flex justify="center" align="center" style={{ minHeight: "100vh", width: "100vw" }}>
      {contextHolder}
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
        }}>Create your account</Title>

        <Paragraph style={{
          fontSize: responsive ? "1rem" : "1.1rem",
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
          name="passwordConfirm"
          style={{ paddingBottom: errors.passwordConfirm ? "1rem" : 0, marginBottom: "1.2rem" }}
          help={
            errors.passwordConfirm && (
              <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.passwordConfirm?.message}</span>
            )
          }
        >
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field }) => (
              <Input.Password
                key="passwordConfirm"
                type="password"
                {...field}
                placeholder={"Enter your password again"}
                prefix={<LockOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />}
                style={{ borderRadius: "0.5rem", height: "3.2rem", background: "white" }}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          name="agreementConfirm"
          style={{ display: "flex", alignItems: "flex-start", marginTop: "1.5rem", paddingBottom: errors.passwordConfirm ? "1rem" : 0, marginBottom: "1.2rem" }}
          help={
            errors.agreementConfirm && (
              <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.agreementConfirm?.message}</span>
            )
          }
        >
          <Controller
            name="agreementConfirm"
            control={control}
            render={({ field }) => (
              <Checkbox
                key="agreementConfirm"
                {...field}
                style={{ fontSize: responsive ? "0.9rem" : "1rem" }}
              >
                I understand and agree to {" "}
                <span style={{ fontSize: responsive ? "0.9rem" : "1rem", color: COLOR.PRIMARY, fontWeight: 500 }}>Terms</span> and {" "}
                <span style={{ fontSize: responsive ? "0.9rem" : "1rem", color: COLOR.PRIMARY, fontWeight: 500 }}>Privacy Policy </span>
              </Checkbox>
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
            style={{ width: "100%", borderRadius: "0.5rem", height: "2.8rem", marginTop: "1rem" }}
          >
            Register
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center", marginTop: "2rem" }}>
          <Text style={{ fontSize: "0.95rem", color: "grey" }}>
            Already have an account? {" "}
            <Link href={URL.LOGIN} style={{ color: COLOR.PRIMARY, fontWeight: 500 }}>Login</Link>
          </Text>
        </Form.Item>
      </Form>
    </Flex>

  );
};

export default RegisterPage;
