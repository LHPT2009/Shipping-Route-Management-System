"use client";
import { COLOR } from "@/constant";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import { Form, Button, Typography, Flex } from "antd";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Paragraph from "antd/es/typography/Paragraph";
import { useAppDispatch, useAppSelector } from "../../../lib/hooks/hooks";
import { RootState } from "@/lib/store";
import { InputOTP } from "antd-input-otp";
import { authActions, ForgotPasswordStatus, RegisterStatus } from "../../../lib/store/auth";
import { URL } from "@/constant/url";

const { Text, Title } = Typography;

export enum VerifyType {
  FORGOT_PASSWORD,
  REGISTER
}

interface VerifyComponentProps {
  verifyType: VerifyType;
}

const VerifyComponent: React.FC<VerifyComponentProps> = ({ verifyType }) => {
  const screenWidth = UseScreenWidth();
  const dispatch = useAppDispatch();
  const email = useAppSelector((state: RootState) =>
    verifyType === VerifyType.FORGOT_PASSWORD ?
      state.auth.forgotPasswordEmail :
      state.auth.registerEmail
  );

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

  const {
    control,
    handleSubmit,
  } = useForm();

  const onFinish = (values: any) => {
    if(verifyType === VerifyType.FORGOT_PASSWORD) {
      dispatch(authActions.changeForgotPasswordStatus(ForgotPasswordStatus.ENTER_NEW_PASSWORD));
    }
    else{
      // call api
      dispatch(authActions.changeRegisterStatus(RegisterStatus.REGISTER));
      dispatch(authActions.setRegisterEmail(""));
    }
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
          We have sent an OTP to your email. Please check your inbox at <span style={{ color: COLOR.PRIMARY }}> {email}</span>
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
            <Link href={URL.LOGIN} style={{ color: COLOR.PRIMARY, fontWeight: 500 }}>Click here to resend</Link>
          </Text>
        </Form.Item>
      </Form>
    </Flex>

  );
};

export default VerifyComponent;
