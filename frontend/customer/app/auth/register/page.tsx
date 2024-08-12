"use client";
import { COLOR } from "@/constant";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import {
  FormOutlined,
  KeyOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SignatureOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Row, Col, Form, Input, Button, Typography, DatePicker, Flex, Checkbox } from "antd";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Paragraph from "antd/es/typography/Paragraph";
import { emailRegex } from "@/utils/validation/email.regex";
import { passwordRegex } from "@/utils/validation/password.regex";
import { useAppSelector } from "../../../lib/hooks/hooks";
import { RootState } from "../../../lib/store";
import { RegisterStatus } from "../../../lib/store/auth";
import RegisterComponent from "../../../components/auth/registration";
import VerifyComponent from "../../../components/auth/verification";

const { Text, Title } = Typography;

const RegisterPage = () => {

  const registerStatus = useAppSelector((state: RootState) => state.auth.registerStatus);

  return (
    registerStatus === RegisterStatus.REGISTER ?
      <RegisterComponent /> :
      <VerifyComponent />
  );
};

export default RegisterPage;
