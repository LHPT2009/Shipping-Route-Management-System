"use client";
import React from "react";

import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { ApolloError, useMutation } from "@apollo/client";
import { NOTIFICATION } from "@/constant/notification";
import { UPDATE_STATUS_USER } from "@/apollo/mutations/user";
import { Button, Flex, Modal } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { COLOR } from "@/constant/color";
import Title from "antd/es/typography/Title";

interface CustomModalProps {
  userId: string;
  statusUser: string;
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const DeleteUserModal: React.FC<CustomModalProps> = ({
  userId,
  statusUser,
  open,
  onClose,
  refetch,
}) => {

  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [updateStatusUser] = useMutation(UPDATE_STATUS_USER, {
    onCompleted: async () => {
      openNotificationWithIcon(
        "success",
        NOTIFICATION.CONGRATS,
        "Status has been updated successfully"
      );
      refetch();
      onClose();
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    },
  });

  const onOk = async () => {
    await updateStatusUser({
      variables: {
        id: userId,
        input: {
          active: statusUser === "Active" ? false : true
        }
      },
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={300}
      footer={null}
    >
      <Title style={{
        fontSize: "1.5rem",
        fontWeight: 700,
        color: COLOR.TEXT,
        marginBottom: 0,
        marginTop: "0.8rem",
      }}> Cautious !!!
      </Title>
      <Paragraph style={{
        marginBottom: "2rem",
        marginTop: "0.9rem"
      }}>
        Do you want to {statusUser === "Active" ? "inactive" : "active"} this user?
      </Paragraph>
      <Flex gap="1rem" style={{ marginBottom: "1.5rem" }}>
        <Button
          type="default"
          className="login-form-button"
          style={{
            width: "100%",
            borderRadius: "0.5rem",
            height: "2.5rem",
            border: "1px solid #4f46e5",
            background: "white",
            color: COLOR.PRIMARY,
          }}
          onClick={onClose}
        >
          No
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{
            width: "100%",
            borderRadius: "0.5rem",
            height: "2.5rem",
          }}
          onClick={onOk}
        >
          Yes
        </Button>
      </Flex>
    </Modal>
  );
};

export default DeleteUserModal;
