"use client";
import React, { useEffect } from "react";
import { UsergroupAddOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, Modal } from "antd";
import { COLOR } from "@/constant";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import useAntNotification from "@/lib/hooks/notification";
import { ApolloError, useMutation } from "@apollo/client";
import { NOTIFICATION } from "@/constant/notification";
import { useHandleError } from "@/lib/hooks/error";
import { DELETE_ROLE, UPDATE_ROLE } from "@/apollo/mutations/role";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

interface CustomModalProps {
  roleId: string;
  roleName: string;
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const UpdateRoleModal: React.FC<CustomModalProps> = ({
  roleId,
  roleName,
  open,
  onClose,
  refetch,
}) => {
  // Validate Yup
  const schema = yup
    .object({ name: yup.string().required("Please enter your rolename") })
    .required();

  //useFrom hook
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (roleName) {
      reset({
        name: roleName || "",
      });
    }
  }, [roleName, reset]);

  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [updateRoleMutation] = useMutation(UPDATE_ROLE, {
    onCompleted: async () => {
      openNotificationWithIcon(
        "success",
        NOTIFICATION.CONGRATS,
        "successfully"
      );
      await refetch();
      onClose();
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    },
  });

  const [deleteRoleMutation] = useMutation(DELETE_ROLE, {
    onCompleted: async () => {
      openNotificationWithIcon(
        "success",
        NOTIFICATION.CONGRATS,
        "Role has been updated successfully!"
      );
      await refetch();
      onClose();
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    },
  });

  const onFinish = async (values: any) => {
    await updateRoleMutation({
      variables: {
        id: roleId,
        input: {
          name: values.name,
        },
      },
    });
  };

  const onDelete = async () => {
    await deleteRoleMutation({
      variables: {
        id: roleId,
      },
    });
  };

  return (
    <Modal
      open={open}
      footer={false}
      onOk={onClose}
      onCancel={onClose}
    >
      <Form
        initialValues={{ remember: true }}
        onFinish={handleSubmit(onFinish)}
      >
        <Title style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: COLOR.TEXT,
          marginBottom: 0,
          marginTop: "0.8rem",
        }}>Role information</Title>

        <Paragraph style={{
          fontSize: "1.1rem",
          marginTop: "0.9rem"
        }}>
          Effortlessly view and update role information through the user management system.
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
              onClick={onDelete}
            >
              Delete
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
              Update
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateRoleModal;
