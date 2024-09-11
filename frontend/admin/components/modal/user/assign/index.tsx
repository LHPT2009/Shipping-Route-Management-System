"use client";
import React, { useEffect, useState } from "react";
import { Button, Flex, Form, Select, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { GET_ROLES } from "@/apollo/query/role";
import { UPDATE_ROLE_FOR_USER } from "@/apollo/mutations/user";
import { NOTIFICATION } from "@/constant/notification";
import useAntNotification from "@/lib/hooks/notification";
import { useHandleError } from "@/lib/hooks/error";

interface CustomModalProps {
  userId: string;
  roleName: string;
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

type Role = {
  id: string;
  name: string;
};

const AssignUserModal: React.FC<CustomModalProps> = ({
  userId,
  roleName,
  open,
  onClose,
  refetch,
}) => {
  const [listItem, setListItem] = useState<Role[]>([]);
  const [roleNameFilter, setRoleNameFilter] = useState<string>("");

  // Validate Yup
  const schema = yup
    .object({ roleId: yup.string().required("Please enter your roleId") })
    .required();

  //useFrom hook
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      roleId: "",
    },
  });

  const { openNotificationWithIcon } = useAntNotification();
  const { handleError } = useHandleError();

  const [updateRoleForUser] = useMutation(UPDATE_ROLE_FOR_USER, {
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

  const onFinish = async (values: any) => {
    await updateRoleForUser({
      variables: {
        id: userId,
        input: {
          roles: values.roleId,
        },
      },
    });
  };
  
  const findRoleByName = (list: Role[], roleName: string): Role | undefined => {
    return list.find((role: Role) => 
      role.name.toLowerCase().includes(roleName.toLowerCase())
    );
  };
  useQuery(GET_ROLES, {
    onCompleted: async (data) => {
      const list = data?.getRoles?.data
      if (list) {
        setListItem(list); 
        const role  = findRoleByName(list, roleNameFilter);
        console.log('role')  
        console.log(role)  
       }
    }
  });
  
  const options = listItem.map((value) => ({
    value: value.id,
    label: value.name
  }));

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
          name="roleId"
          style={{
            paddingBottom: errors.roleId ? "1rem" : 0,
            marginTop: "2.7rem",
          }}
          help={
            errors.roleId && (
              <span style={{ color: "red", fontSize: "0.9rem" }}>
                {errors.roleId?.message}
              </span>
            )
          }
        >
          <Controller
            name="roleId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                key="roleId"
                style={{ width: 120 }}
                options={ options }
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
          </Flex>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AssignUserModal;
