"use client";
import React, { useState } from "react";
import ContentComponent from "@/components/content";
import { Col, Flex, Row, theme, Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import CreateRoleModal from "@/components/modal/role/create";
import UpdateRoleModal from "@/components/modal/role/update";
import AssginPermissionToRoleModal from "@/components/modal/role/assign";
import useRoles from "@/lib/hooks/role/useRoles";
import { menuActions, MenuState } from "@/lib/store/menu";
import { KEYMENU, LABELMENU } from "@/constant";

interface DataType {
  id: string;
  name: string;
}

const RolePage = () => {
  const { roles, loading, error, refetch } = useRoles();

  const dispatch = useAppDispatch();
  const value: MenuState = {
    keyMenu: KEYMENU.ROLE,
    labelMenu: LABELMENU.ROLE
  }
  dispatch(menuActions.changeInfoMenu(value))

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalAssignPermissionToRole, setOpenModalAssignPermissionToRole] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [selectedRolename, setSelectedRolename] = useState<string | null>(null);

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
  };
  const handleOpenModalUpdate = (id: string, name: string) => {
    setSelectedRoleId(id);
    setSelectedRolename(name);
    setOpenModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  const handleOpenModalAssignPermissionToRole = (id: string) => {
    setSelectedRoleId(id);
    setOpenModalAssignPermissionToRole(true);
  };

  const handleCloseModalAssignPermissionToRole = () => {
    setOpenModalAssignPermissionToRole(false);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      dataIndex: "Action",
      key: "Action",
      render: (_, record) => (
        <Flex justify="end" align="end" wrap gap="small">
          <Button
            type="primary"
            size="large"
            onClick={() => handleOpenModalUpdate(record.id, record.name)}
          >
            Detail
          </Button>
          <Button
            type="default"
            size="large"
            onClick={() => handleOpenModalAssignPermissionToRole(record.id)}
          >
            Assign Permission To Role
          </Button>
        </Flex>
      ),
    },
  ];

  const checkStatusBackground: boolean = useAppSelector(
    (state) => state.responsive.checkStatusBackground
  );

  return (
    <>
      {!checkStatusBackground ? (
        <></>
      ) : (
        <>
          <ContentComponent>
            <Button
              type="primary"
              size="large"
              onClick={handleOpenModalCreate}
            >
              Create New
            </Button>
            <Table
              columns={columns}
              dataSource={roles}
              scroll={{ x: 768, y: 375 }}
            />
          </ContentComponent>
        </>
      )}
      <CreateRoleModal
        open={openModalCreate}
        onClose={handleCloseModalCreate}
        refetch={refetch}
      />
      <UpdateRoleModal
        roleId={selectedRoleId ? `${selectedRoleId}` : ""}
        roleName={selectedRolename ? `${selectedRolename}` : ""}
        open={openModalUpdate}
        onClose={handleCloseModalUpdate}
        refetch={refetch}
      />
      <AssginPermissionToRoleModal
        roleId={selectedRoleId ? `${selectedRoleId}` : ""}
        open={openModalAssignPermissionToRole}
        onClose={handleCloseModalAssignPermissionToRole}
      />
    </>
  );
};

export default RolePage;
