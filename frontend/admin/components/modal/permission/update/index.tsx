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
import {
  DELETE_PERMISSION,
  UPDATE_PERMISSION,
} from "@/apollo/mutations/permission";

interface CustomModalProps {
  permissionId: string;
  permissionName: string;
  open: boolean;
  onClose: () => void;
}

const UpdatePermissionModal: React.FC<CustomModalProps> = ({
  permissionId,
  permissionName,
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
    if (permissionName) {
      reset({
        name: permissionName || "",
      });
    }
  }, [permissionName, reset]);

  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [updatePermissionMutation] = useMutation(UPDATE_PERMISSION, {
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

  const [deletePermissionMutation] = useMutation(DELETE_PERMISSION, {
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
    await updatePermissionMutation({
      variables: {
        id: permissionId,
        input: {
          name: values.name,
        },
      },
    });
  };

  const onDelete = async () => {
    await deletePermissionMutation({
      variables: {
        id: permissionId,
      },
    });
  };

  return (
    <Modal
      title="UpdatePermissionModal"
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

export default UpdatePermissionModal;
