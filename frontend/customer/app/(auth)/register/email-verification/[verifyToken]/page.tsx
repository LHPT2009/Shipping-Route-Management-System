"use client";
import { COLOR } from "@/constant";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import { Form, Button, Typography, Flex, Spin } from "antd";
import { useForm } from "react-hook-form";
import Paragraph from "antd/es/typography/Paragraph";
import { URL } from "@/constant/url";
import { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import VerifyImg from "../../../../../public/images/verify/email.png"
import { ApolloError, useMutation } from "@apollo/client";
import { CONFIRM_EMAIL } from "@/apollo/mutations/auth";
import { extractErrorMessages } from "@/utils/error/format.error";
import { getErrorMessage } from "@/utils/error/apollo.error";

const { Title } = Typography;

interface VerifyAccountProps {
  params: any; // Replace 'any' with the appropriate type for the 'params' property
}

const VerifyAccount: React.FC<VerifyAccountProps> = ({params}) => {
  const screenWidth = UseScreenWidth();
  const router = useRouter();
  const searchParams = useSearchParams()
  const email = searchParams.get("email");

  const responsive = GetValueFromScreen(screenWidth, true, true, true, true);

  const {
    handleSubmit,
  } = useForm();

  const onFinish = (values: any) => {
    router.push(URL.LOGIN);
  };

  const [confirmEmailMutation, { loading, error, data }] = useMutation(CONFIRM_EMAIL, {
    onError(error: ApolloError) {
      const errorMessage: string = extractErrorMessages(getErrorMessage(error));
      console.log(errorMessage);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      await confirmEmailMutation({
        variables: {
          input: {
            verifyToken: params.verifyToken,
          }
        }
      });
    };
    fetchData();
  }, [confirmEmailMutation, params.verifyToken]);

  return (

    <Flex justify="center" align="center" style={{ minHeight: "100vh", width: "100vw" }}>
      {loading ?
        <Spin size="large" /> :
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
          }}>Congratulations!</Title>

          <Paragraph style={{
            fontSize: "1.1rem",
            marginTop: "0.9rem"
          }}>
            Your account has been successfully verified with the email <span style={{ color: COLOR.PRIMARY }}> {email}</span>
          </Paragraph>

          <img src={VerifyImg.src} alt="VerifyImg" style={{ width: responsive ? "15rem" : "20rem", height: "auto", margin: "1rem auto" }} />

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%", borderRadius: "0.5rem", height: "2.8rem", margin: "2rem 0 1rem 0" }}
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      }
    </Flex>

  );
};

export default VerifyAccount;
