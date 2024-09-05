import React, { useState } from "react";
import { Button, Transfer, Typography, Flex, Modal } from "antd";
import type { TransferProps } from "antd";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { GET_ROLE } from "@/apollo/query/role";
import { GET_PERMISSIONS } from "@/apollo/query/permission";
import { NOTIFICATION } from "@/constant/notification";
import { useHandleError } from "@/lib/hooks/error";
import useAntNotification from "@/lib/hooks/notification";
import { ADD_PERMISSION_TO_ROLE } from "@/apollo/mutations/role";

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

  useQuery(GET_ROLE, {
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
    onCompleted: () => {
      openNotificationWithIcon(
        "success",
        NOTIFICATION.CONGRATS,
        "Update successfully"
      );
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
      title="AssginPermissionToRoleModal"
      centered
      open={open}
      onOk={onClose}
      onCancel={onClose}
      footer={false}
    >
      <Title level={2}>{nameRole}</Title>
      <Transfer
        dataSource={mockData}
        targetKeys={targetKeys}
        onChange={handleChange}
        render={(item) => item.name}
        titles={["All of Permission", `Permissions of the ${nameRole}`]}
      />
      <Flex
        justify="start"
        align="start"
        wrap
        gap="small"
        style={{ marginTop: "10px" }}
      >
        <Button type="primary" size="large" onClick={onSubmit}>
          Save
        </Button>
      </Flex>
    </Modal>
  );
};

export default AssginPermissionToRoleModal;
