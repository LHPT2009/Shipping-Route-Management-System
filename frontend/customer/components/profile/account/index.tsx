'use client';

import React, { useState } from "react";
import { Button, Flex, Form, Input, Modal } from "antd";
import styles from "../profile.module.css";
import Male from "../../../public/images/homepage/male.png";
import Title from "antd/es/typography/Title";
import { COLOR } from "@/constant/color";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { UserState } from "@/lib/store/user";
import Paragraph from "antd/es/typography/Paragraph";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordRegex } from "@/utils/validation/password.regex";
import * as yup from "yup";
import { LockOutlined } from "@ant-design/icons";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { ApolloError, useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "@/apollo/mutations/auth";
import { NOTIFICATION } from "@/constant/notification";
import { fetchCookies } from "@/utils/token/fetch_cookies.token";

const AccountInformationComponent: React.FC = () => {

  const user: UserState = useAppSelector((state) => state.user);

  const [open, setOpen] = useState<boolean>(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const schema = yup
    .object({
      currentPassword: yup
        .string()
        .required("Please enter your current password"),

      newPassword: yup
        .string()
        .matches(passwordRegex, { message: "Please enter a stronger password (Min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit)" })
        .required("Please enter your new password"),

      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("newPassword")], "Confirm password must match password")
        .required("Please enter your new confirm password"),
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useAppDispatch();
  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
    onCompleted: async (data) => {
      openNotificationWithIcon('success', NOTIFICATION.CONGRATS, "New password was updated successfully");
      setOpen(false);
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const onFinish = async (values: any) => {
    //call api
    const { accessToken, expiresIn } = await fetchCookies();
    if (accessToken && expiresIn) {
      await changePassword({
        variables: {
          input: {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            passwordConfirm: values.passwordConfirm
          }
        },
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        }
      });
    }
  };

  return (
    <div className={styles['common-container']} style={{ paddingBottom: "1.5rem" }}>

      {/* <Title level={4} style={{
        fontSize: "1.2rem",
        marginBottom: "1.2rem",
        fontWeight: 700,
        color: COLOR.TEXT,
        textAlign: "left",
      }}>
        Account information
      </Title> */}
      <Flex justify="center" align="center" >
        <img className={styles["avatar"]} src={Male.src} alt="tung" />
        <Flex justify="space-between" align="flex-start" style={{ width: "100%", margin: 0 }}>
          <Flex gap="0.3rem" vertical align="flex-start" style={{ marginLeft: "1.5rem" }}>
            <Title
              level={5}
              style={{ color: COLOR.TEXT, margin: 0 }}
            >
              {user.email}
            </Title>
            <Paragraph
              style={{
                fontSize: "0.9rem",
                margin: 0
              }}
            >
              {user.role}
            </Paragraph>
            <Button
              type="text"
              onClick={showModal}
              style={{
                fontSize: "0.9rem",
                height: "min-content",
                margin: 0,
                padding: 0,
                color: "#4f46e5",
                background: "none",
                fontWeight: "500",
              }}
            >
              Change password
            </Button>
          </Flex>
        </Flex>

        <Modal
          title={
            <Title level={4} style={{
              fontSize: "1.5rem",
              marginBottom: "1.2rem",
              fontWeight: 700,
              color: COLOR.TEXT,
              textAlign: "left",
            }}>
              Change password
            </Title>
          }
          style={{ top: 50 }}
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          width={530}
          footer={null}
        >
          <Form
            layout="vertical"
            initialValues={{ remember: true }}
            style={{
              // width: "35rem",
              height: "auto",
              // padding: "1rem",
              margin: "2rem 0",
              borderRadius: "1rem",
              backgroundColor: COLOR.BACKGROUNDBODY,
              textAlign: "left",
            }}
            onFinish={handleSubmit(onFinish)}
          >
            {/* Current password */}
            <Form.Item
              label="Current password"
              name="currentPassword"
              style={{ paddingBottom: errors.currentPassword ? "1rem" : 0, marginBottom: "1.2rem", marginTop: "2rem" }}
              help={
                errors.currentPassword && (
                  <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.currentPassword?.message}</span>
                )
              }
            >
              <Controller
                name="currentPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    key="currentPassword"
                    {...field}
                    placeholder={"Enter your current password"}
                    prefix={<LockOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />}
                    type="currentPassword"
                    style={{ borderRadius: "0.5rem", height: "3.2rem", background: "white" }}
                  />
                )}
              />
            </Form.Item>

            {/* New password */}
            <Form.Item
              label="New password"
              name="newPassword"
              style={{ paddingBottom: errors.newPassword ? "1rem" : 0, marginBottom: "1.2rem", marginTop: "1.2rem" }}
              help={
                errors.newPassword && (
                  <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.newPassword?.message}</span>
                )
              }
            >
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <Input.Password
                    key="newPassword"
                    {...field}
                    placeholder={"Enter your new password"}
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

            {/* Button */}
            <Flex justify="flex-end" align="center" gap="1rem" style={{ height: "2.8rem", marginTop: "3rem" }}>
              <Form.Item>
                <Button
                  type="default"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "7rem", borderRadius: "0.5rem", marginTop: "1rem", height: "2.6rem", color: COLOR.PRIMARY, border: "1px solid #4f46e5", background: "white" }}
                >
                  Cancel
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "7rem", borderRadius: "0.5rem", marginTop: "1rem", height: "2.6rem" }}
                >
                  Save
                </Button>
              </Form.Item>
            </Flex>

          </Form>
        </Modal>
      </Flex>

    </div>
  );
};

export default AccountInformationComponent;
