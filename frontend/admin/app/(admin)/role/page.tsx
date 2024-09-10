"use client";
import React, { useEffect, useState } from "react";
import ContentComponent from "@/components/content";
import { Col, Flex, Row, theme, Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import CreateRoleModal from "@/components/modal/role/create";
import UpdateRoleModal from "@/components/modal/role/update";
import AssginPermissionToRoleModal from "@/components/modal/role/assign";
import useRoles from "@/lib/hooks/role/useRoles";
import { menuActions, MenuState } from "@/lib/store/menu";
import { COLOR, KEYMENU, LABELMENU } from "@/constant";
import styles from "./role.module.css";
import { PlusOutlined } from "@ant-design/icons";

interface DataType {
  id: string;
  name: string;
}

const RolePage = () => {
  const { roles, refetch } = useRoles();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const value: MenuState = {
      keyMenu: KEYMENU.ROLE,
      labelMenu: LABELMENU.ROLE,
    };
    dispatch(menuActions.changeInfoMenu(value));
  }, [dispatch]);

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
        <Flex justify="end" align="end" wrap gap="1rem">

          <Button
            onClick={() => handleOpenModalUpdate(record.id, record.name)}
            style={{ border: "0.5px solid #4f46e5", color: COLOR.PRIMARY, padding: "1.1rem 1.2rem", borderRadius: "0.3rem", background: "white" }}
          >
            Detail
          </Button>

          <Button
            type="primary"
            onClick={() => handleOpenModalAssignPermissionToRole(record.id)}
            style={{ padding: "1.1rem 1.2rem", borderRadius: "0.3rem"}}
          >
            Assign permission
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
              onClick={handleOpenModalCreate}
              style={{ padding: "1.2rem 1.2rem", borderRadius: "0.3rem", marginBottom: "1.5rem" }}
            >
              <PlusOutlined />
              New role
            </Button>
            <Table
              columns={columns}
              dataSource={roles}
              className={styles['table-striped-rows']}
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
