"use client";
import React from "react";
import { GroupOutlined, UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal } from "antd";
import { COLOR } from "@/constant";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import useAntNotification from "@/lib/hooks/notification";
import { ApolloError, useMutation } from "@apollo/client";
import { NOTIFICATION } from "@/constant/notification";
import { useHandleError } from "@/lib/hooks/error";
import { ADD_ROLE } from "@/apollo/mutations/role";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const CreateRoleModal: React.FC<CustomModalProps> = ({ open, onClose, refetch }) => {
  const schema = yup
    .object({ name: yup.string().required("Please enter your rolename") })
    .required();

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
        "New role has been created successfully!"
      );
      await refetch();
      onClose();
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
        <Title style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: COLOR.TEXT,
          marginBottom: 0,
          marginTop: "0.8rem",
        }}>Create new role</Title>

        <Paragraph style={{
          fontSize: "1.1rem",
          marginTop: "0.9rem"
        }}>
          Creating a new role sets permissions and responsibilities to control user access.
        </Paragraph>

        <Form.Item
          name="name"
          style={{
            paddingBottom: errors.name ? "1rem" : 0,
            marginTop: "1.6rem",
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
                  <UsergroupAddOutlined style={{ padding: "0 0.5rem 0 0.25rem" }} />
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
          <Flex gap="1rem" style={{ marginTop: "1rem" }}>
            <Button
              type="default"
              className="login-form-button"
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                height: "2.8rem",
                border: "1px solid #4f46e5",
                background: "white",
                color: COLOR.PRIMARY,
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                height: "2.8rem",
              }}
            >
              Create
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateRoleModal;
