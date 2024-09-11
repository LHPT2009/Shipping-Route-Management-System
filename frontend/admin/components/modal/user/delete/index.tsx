"use client";
import React from "react";

import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { ApolloError, useMutation } from "@apollo/client";
import { NOTIFICATION } from "@/constant/notification";
import { DELETE_USER } from "@/apollo/mutations/user";
import { Modal } from "antd";

interface CustomModalProps {
  userId:string;
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const DeleteUserModal: React.FC<CustomModalProps> = ({
  userId,
  open,
  onClose,
  refetch,
}) => {

  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [deleteUser] = useMutation(DELETE_USER, {
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

  const onOk = async () => {
    await deleteUser({
      variables: {
        id: userId
      },
    });
  };

  return (
    <Modal
      title="Inform"
      centered
      open={open}
      onOk={onOk}
      onCancel={onClose}
      width={300}
    >
    Do you want to delete this user?
    </Modal>
  );
};

export default DeleteUserModal;
