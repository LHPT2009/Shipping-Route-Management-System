'use client';

import React, { useEffect } from "react";
import { ChildrenComponentProps } from "@/types/children";
import { Button, Flex, Form, Input } from "antd";
import styles from "../profile.module.css";
import Tung from "../../../public/images/homepage/tung_2.jpg";
import Title from "antd/es/typography/Title";
import { COLOR } from "@/constant/color";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { userActions, UserState } from "@/lib/store/user";
import Paragraph from "antd/es/typography/Paragraph";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";
import { passwordRegex } from "@/utils/validation/password.regex";
import { yupResolver } from "@hookform/resolvers/yup";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { usernameRegex } from "@/utils/validation/username.regex";
import { emailRegex } from "@/utils/validation/email.regex";
import { phoneRegex } from "@/utils/validation/phone.regex";
import { ApolloError, useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "@/apollo/mutations/user";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { NOTIFICATION } from "@/constant/notification";
import { fetchCookies } from "@/utils/token/fetch_cookies.token";

const PersonalInformationComponent: React.FC = () => {

  const user: UserState = useAppSelector((state) => state.user);

  const schema = yup
    .object({
      username: yup
        .string()
        .matches(usernameRegex, { message: "Please enter a valid username" }),

      phone: yup
        .string()
        .matches(phoneRegex, { message: "Please enter a valid username" }),

      email: yup
        .string(),

      fullname: yup
        .string(),

      address: yup
        .string(),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: user.username,
      phone: user.phone,
      email: user.email,
      fullname: user.fullname,
      address: user.address,
    },
  });

  const dispatch = useAppDispatch();
  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [updateUserByToken, { loading }] = useMutation(UPDATE_PROFILE, {
    onCompleted: async (data) => {
      const userData: UserState = {
        username: data.updateUserByToken.data.username,
        email: user.email,
        fullname: data.updateUserByToken.data.fullname,
        address: data.updateUserByToken.data.address,
        phone: data.updateUserByToken.data.phone_number,
        role: user.role
      }
      dispatch(userActions.setUserInformation(userData));
      openNotificationWithIcon('success', NOTIFICATION.CONGRATS, "User information was updated successfully");
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        username: user.username,
        phone: user.phone,
        email: user.email,
        fullname: user.fullname,
        address: user.address
      });
    }
  }, [user, reset]);

  const onFinish = async (values: any) => {
    const { accessToken, expiresIn } = await fetchCookies();
    if (accessToken && expiresIn) {
      await updateUserByToken({
        variables: {
          input: {
            fullname: values.fullname,
            username: values.username,
            phone_number: values.phone,
            address: values.address,
          }
        },
        context: {
          headers: {
            accesstoken: accessToken
          }
        }
      });
    }
  };

  return (
    <div className={styles['common-container']} style={{ marginTop: "2.5rem" }}>
      <Title level={4} style={{
        fontSize: "1.2rem",
        marginBottom: "1.2rem",
        fontWeight: 700,
        color: COLOR.TEXT,
        textAlign: "left",
      }}>
        Personal information
      </Title>
      <Form
        layout="vertical"
        initialValues={{ remember: true }}
        style={{
          height: "auto",
          borderRadius: "1rem",
          backgroundColor: COLOR.BACKGROUNDBODY,
          textAlign: "left",
        }}
        onFinish={handleSubmit(onFinish)}
      >
        <Flex gap="1rem" justify="space-between">

          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            style={{ paddingBottom: errors.username ? "1rem" : 0, marginBottom: "1.2rem", width: "48%" }}
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
                  {...field}
                  key="username"
                  style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", paddingLeft: "1rem" }}
                />
              )}
            />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            label="Phone number"
            name="phone"
            style={{ paddingBottom: errors.phone ? "1rem" : 0, marginBottom: "1.2rem", width: "48%" }}
            help={
              errors.phone && (
                <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.phone?.message}</span>
              )
            }
          >
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  key="phone"
                  {...field}
                  style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", paddingLeft: "1rem" }}
                />
              )}
            />
          </Form.Item>
        </Flex>

        <Flex gap="1rem" justify="space-between">

          {/* Fullname */}
          <Form.Item
            label="Fullname"
            name="fullname"
            style={{ paddingBottom: errors.fullname ? "1rem" : 0, marginBottom: "1.2rem", width: "48%" }}
            help={
              errors.fullname && (
                <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.fullname?.message}</span>
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
                  style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", paddingLeft: "1rem" }}
                />
              )}
            />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            style={{ paddingBottom: errors.email ? "1rem" : 0, marginBottom: "1.2rem", width: "48%" }}
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
                  disabled
                  key="email"
                  {...field}
                  style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", paddingLeft: "1rem" }}
                />
              )}
            />
          </Form.Item>
        </Flex>

        {/* Address */}
        <Form.Item
          label="Address"
          name="address"
          style={{ paddingBottom: errors.address ? "1rem" : 0, marginBottom: "1.2rem", width: "100%" }}
          help={
            errors.address && (
              <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.address?.message}</span>
            )
          }
        >
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input
                key="address"
                {...field}
                style={{ borderRadius: "0.5rem", height: "2.8rem", background: "white", paddingLeft: "1rem" }}
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
            style={{ width: "10rem", borderRadius: "0.5rem", height: "2.7rem", marginTop: "1.2rem", float: "right" }}
          >
            Update profile
          </Button>
        </Form.Item>

      </Form>

    </div>
  );
};

export default PersonalInformationComponent;
