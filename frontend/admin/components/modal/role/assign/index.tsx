import React, { useState } from "react";
import { Button, Transfer, Typography, Flex, Modal, Tag } from "antd";
import type { TransferProps } from "antd";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { GET_ROLE } from "@/apollo/query/role";
import { GET_PERMISSIONS } from "@/apollo/query/permission";
import { NOTIFICATION } from "@/constant/notification";
import { useHandleError } from "@/lib/hooks/error";
import useAntNotification from "@/lib/hooks/notification";
import { ADD_PERMISSION_TO_ROLE } from "@/apollo/mutations/role";
import { COLOR } from "@/constant/color";
import Paragraph from "antd/es/typography/Paragraph";

interface CustomModalProps {
  roleId: string;
  open: boolean;
  onClose: () => void;
}

interface RecordType {
  key: string;
  name: string;
  chosen?: boolean;
}

const { Title } = Typography;

const AssginPermissionToRoleModal: React.FC<CustomModalProps> = ({
  roleId,
  open,
  onClose,
}) => {
  const [nameRole, setNameRole] = useState("Loading...");
  const [mockData, setMockData] = useState<RecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>([]);

  const handleChange: TransferProps["onChange"] = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  const { refetch } = useQuery(GET_ROLE, {
    variables: { id: roleId },
    onCompleted: (data) => {
      setNameRole(data.getRole.data.name);
      const rolePermissions = data.getRole.data.permissions.map(
        (permission: any) => ({
          key: permission.id,
          name: permission.name,
        })
      );
      setTargetKeys(rolePermissions.map((perm: RecordType) => perm.key));
    },
  });

  useQuery(GET_PERMISSIONS, {
    onCompleted: (data) => {
      const allPermissions = data.getPermissions.data.map(
        (permission: any) => ({
          key: permission.id,
          name: permission.name,
        })
      );
      setMockData(allPermissions);
    },
  });

  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [addPermissionToRole] = useMutation(ADD_PERMISSION_TO_ROLE, {
    onCompleted: async () => {
      openNotificationWithIcon(
        "success",
        NOTIFICATION.CONGRATS,
        "Permissions have been assigned successfully!"
      );
      onClose();
      await refetch();
      onClose();
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    },
  });

  const onSubmit = async () => {
    await addPermissionToRole({
      variables: {
        input: {
          roleId: roleId,
          permissionIds: targetKeys?.map(String),
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
      <Title style={{
        fontSize: "1.5rem",
        fontWeight: 700,
        color: COLOR.TEXT,
        marginBottom: 0,
        marginTop: "0.8rem",
      }}> Assign permissions
      </Title>

      <Paragraph style={{
        fontSize: "1.1rem",
        marginTop: "0.9rem"
      }}>
        Enhancing security, streamlining management, improving efficiency, and ensuring compliance.
      </Paragraph>

      <Tag
        color={nameRole === 'CUSTOMER' ? 'geekblue' : nameRole === 'ADMIN' ? 'cyan' : 'magenta'}
        style={{ marginBottom: "1.5rem", fontSize: "1rem", fontWeight: 700, padding: "0.35rem 0.65rem" }}
      >
        {nameRole}
      </Tag>
      <Transfer
        listStyle={{ width: 213 }}
        dataSource={mockData}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={(item) => item.name}
        titles={["All of Permission", `Permissions of the ${nameRole}`]}
      />

      <Flex gap="1rem" style={{ marginTop: "2.5rem" }}>
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
          onClick={onSubmit}
          style={{
            width: "100%",
            borderRadius: "0.5rem",
            height: "2.8rem",
          }}
        >
          Assign
        </Button>
      </Flex>
    </Modal>
  );
};

export default AssginPermissionToRoleModal;
