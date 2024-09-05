"use client";
import React, { useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
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

interface CustomModalProps {
  roleId: string;
  roleName: string;
  open: boolean;
  onClose: () => void;
}

const UpdateRoleModal: React.FC<CustomModalProps> = ({
  roleId,
  roleName,
  open,
  onClose,
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
        "successfully"
      );
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
      title="Information Detail"
      centered
      open={open}
      footer={false}
      onOk={onClose}
      onCancel={onClose}
    >
      <Form
        initialValues={{ remember: true }}
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
          <Flex gap="small">
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
              Update
            </Button>
            <Button
              type="default"
              className="login-form-button"
              style={{
                width: "100%",
                borderRadius: "0.5rem",
                height: "2.8rem",
                marginTop: "0.5rem",
              }}
              onClick={onDelete}
            >
              Delete
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateRoleModal;
