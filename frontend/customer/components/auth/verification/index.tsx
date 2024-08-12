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
import { InputOTP } from "antd-input-otp";

const { Text, Title } = Typography;

const VerifyComponent = () => {
  const screenWidth = UseScreenWidth();
  const dispatch = useAppDispatch();
  const emailRegister = useAppSelector((state: RootState) => state.auth.emailRegister);

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
      otp: yup
        .string()
        .required("Please enter your OTP"),
    })
    .required();

  const {
    control,
    handleSubmit,
  } = useForm();

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
        }}>Verify your account</Title>

        <Paragraph style={{
          fontSize: "1.1rem",
          marginTop: "0.9rem"
        }}>
          We have sent an OTP to your email. Please check your inbox at <span style={{ color: COLOR.PRIMARY }}> {emailRegister}</span>.
        </Paragraph>

        {/* OTP */}
        <Form.Item
          name="otp"
          style={{ marginBottom: "1.2rem", marginTop: "2.8rem" }}
        >
          <Controller
            name="otp"
            control={control}
            render={({ field }) => (
              <InputOTP
                key="otp"
                required={true}
                autoFocus={true}
                autoSubmit={onFinish}
                inputType="numeric"
                inputStyle={{ fontSize: "1.7rem", margin: 0, borderRadius: "0.5rem", height: "4rem", background: "white" }}
              />
            )}
          />

        </Form.Item>

        {/* Button submit*/}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "100%", borderRadius: "0.5rem", height: "2.8rem", marginTop: "2rem" }}
          >
            Submit
          </Button>
        </Form.Item>

        <Form.Item style={{ textAlign: "center", marginTop: "2rem" }}>
          <Text style={{ fontSize: "0.95rem", color: "grey" }}>
            Didn’t receive the OTP? {" "}
            <Link href={"/auth/login"} style={{ color: COLOR.PRIMARY, fontWeight: 500 }}>Click here to resend</Link>
          </Text>
        </Form.Item>
      </Form>
    </Flex>

  );
};

export default VerifyComponent;
