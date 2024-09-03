"use client";
import ContentComponent from "@/components/content";
import React, { useState } from "react";
import { Button, Transfer, Typography, Flex } from "antd";
import type { TransferProps } from "antd";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { GET_ROLE } from "@/apollo/query/role";
import { GET_PERMISSIONS } from "@/apollo/query/permission";
import { NOTIFICATION } from "@/constant/notification";
import { useHandleError } from "@/lib/hooks/error";
import useAntNotification from "@/lib/hooks/notification";
import { ADD_PERMISSION_TO_ROLE } from "@/apollo/mutations/role";

interface RecordType {
  key: string;
  name: string;
  chosen?: boolean;
}

const { Title } = Typography;

const DetailRolePage = ({ params }: { params: { id: string } }) => {
  const [nameRole, setNameRole] = useState("Loading...");
  const [mockData, setMockData] = useState<RecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<TransferProps["targetKeys"]>([]);

  const handleChange: TransferProps["onChange"] = (newTargetKeys) => {
    setTargetKeys(newTargetKeys);
  };

  useQuery(GET_ROLE, {
    variables: { id: params.id },
    onCompleted: (data) => {
      setNameRole(data.getRole.data.name);
      const rolePermissions = data.getRole.data.permissions.map(
        (permission: any) => ({
          key: permission.id,
          name: permission.name,
        })
      );
      console.log("Check GET_ROLE");
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
      console.log("Check GET_PERMISSIONS");
      setMockData(allPermissions);
    },
  });
  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [addPermissionToRole] = useMutation(ADD_PERMISSION_TO_ROLE, {
    onCompleted: async (data) => {
      openNotificationWithIcon(
        "success",
        NOTIFICATION.CONGRATS,
        "Login successfully"
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
          roleId: params.id,
          permissionIds: targetKeys?.map(String),
        },
      },
    });
  };

  return (
    <>
      <ContentComponent>
        <div style={{ height: "577px" }}>
          <Title level={2}>{nameRole}</Title>
          <Transfer
            dataSource={mockData}
            targetKeys={targetKeys}
            onChange={handleChange}
            render={(item) => item.name}
            listStyle={{
              width: 400,
              height: 300,
            }}
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
        </div>
      </ContentComponent>
    </>
  );
};

export default DetailRolePage;
