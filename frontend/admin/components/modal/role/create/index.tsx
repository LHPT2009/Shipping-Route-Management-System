"use client";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { COLOR } from "@/constant";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import useAntNotification from "@/lib/hooks/notification";
import { ApolloError, useMutation } from "@apollo/client";
import { NOTIFICATION } from "@/constant/notification";
import { useHandleError } from "@/lib/hooks/error";
import { ADD_ROLE } from "@/apollo/mutations/role";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateRoleModal: React.FC<CustomModalProps> = ({ open, onClose }) => {
  // Validate Yup
  const schema = yup
    .object({ name: yup.string().required("Please enter your rolename") })
    .required();

  //useFrom hook
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [addRoleMutation] = useMutation(ADD_ROLE, {
    onCompleted: async () => {
      openNotificationWithIcon(
        "success",
        NOTIFICATION.CONGRATS,
        "successfully"
      );
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    },
  });

  const onFinish = async (values: any) => {
    await addRoleMutation({
      variables: {
        input: {
          name: values.name,
        },
      },
    });
  };
  return (
    <Modal
      title="CreateRoleModal"
      centered
      open={open}
      onOk={onClose}
      onCancel={onClose}
      footer={false}
    >
      <Form
        initialValues={{ remember: true }}
        style={{
          backgroundColor: COLOR.BACKGROUND,
          textAlign: "left",
        }}
        onFinish={handleSubmit(onFinish)}
      >
        <Form.Item
          name="name"
          style={{
            paddingBottom: errors.name ? "1rem" : 0,
            marginTop: "2.7rem",
          }}
          help={
            errors.name && (
              <span style={{ color: "red", fontSize: "0.9rem" }}>
                {errors.name?.message}
              </span>
            )
          }
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                key="name"
                {...field}
                placeholder={"Enter your role name"}
                prefix={
                  <UserOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />
                }
                style={{
                  borderRadius: "0.5rem",
                  height: "3.2rem",
                  background: "white",
                }}
              />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{
              width: "100%",
              borderRadius: "0.5rem",
              height: "2.8rem",
              marginTop: "0.5rem",
            }}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateRoleModal;
