import React from "react";
import { Button, Flex, Form, Input, Modal } from "antd";
import Title from "antd/es/typography/Title";
import { COLOR } from "@/constant/color";
import * as yup from "yup";
import { passwordRegex } from "@/utils/validation/password.regex";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@/lib/hooks/hooks";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { NOTIFICATION } from "@/constant/notification";
import { CHANGE_PASSWORD } from "@/apollo/mutations/auth";
import { ApolloError, useMutation } from "@apollo/client";
import { LockOutlined } from "@ant-design/icons";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<CustomModalProps> = ({ open, onClose }) => {

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

  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
    onCompleted: async (data) => {
      openNotificationWithIcon('success', NOTIFICATION.CONGRATS, "New password was updated successfully");
      onClose();
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const onFinish = async (values: any) => {
    //call api
    await changePassword({
      variables: {
        input: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          passwordConfirm: values.passwordConfirm
        }
      }
    });
  }

  return (<Modal
    style={{ top: 50 }}
    open={open}
    onCancel={onClose}
    width={530}
    footer={null}
  >
    <Title level={4} style={{
      marginTop: "0.8rem",
      fontSize: "1.5rem",
      marginBottom: "1.2rem",
      fontWeight: 700,
      color: COLOR.TEXT,
      textAlign: "left",
    }}>
      Change password
    </Title>
    <Form
      layout="vertical"
      initialValues={{ remember: true }}
      style={{
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
            onClick={onClose}
            className="login-form-button"
            style={{ width: "7rem", borderRadius: "0.5rem", marginTop: "1rem", height: "2.6rem", color: COLOR.PRIMARY, border: "1px solid #4f46e5", background: "white" }}
          >
            Cancel
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
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
  );
};

export default ChangePasswordModal;
