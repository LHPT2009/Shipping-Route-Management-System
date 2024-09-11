"use client";
import React from "react";

import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";
import { ApolloError, useMutation } from "@apollo/client";
import { NOTIFICATION } from "@/constant/notification";
import { DELETE_USER } from "@/apollo/mutations/user";
import { Button, Flex, Modal } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { COLOR } from "@/constant/color";
import Title from "antd/es/typography/Title";

interface CustomModalProps {
  routeId: string;
  open: boolean;
  onClose: () => void;
  onDelete: (routeId: string) => void;
}

const DeleteRouteModal: React.FC<CustomModalProps> = ({
  routeId,
  open,
  onClose,
  onDelete,
}) => {
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
        Do you want to delete this route?
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
          onClick={() => {
            onDelete(routeId);
            onClose();
          }}
        >
          Yes
        </Button>
      </Flex>
    </Modal>
  );
};

export default DeleteRouteModal;
