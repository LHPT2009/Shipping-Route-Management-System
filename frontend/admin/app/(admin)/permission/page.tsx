"use client";
import React, { useState } from "react";
import ContentComponent from "@/components/content";
import { Col, Flex, Row, theme, Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useAppSelector } from "@/lib/hooks/hooks";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_PERMISSIONS } from "@/apollo/query/permission";
import CreatePermissionModal from "@/components/modal/permission/create";
import UpdatePermissionModal from "@/components/modal/permission/update";

interface DataType {
  id: string;
  name: string;
}

const PermissionPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();

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
        <Button
          type="primary"
          onClick={() => handleOpenModalUpdate(record.id, record.name)}
        >
          Detail
        </Button>
      ),
    },
  ];

  const checkStatusBackground: boolean = useAppSelector(
    (state) => state.responsive.checkStatusBackground
  );

  const [listItem, setListItem] = useState<DataType[]>();

  useQuery(GET_PERMISSIONS, {
    onCompleted: async (data) => {
      setListItem(data.getPermissions.data);
    },
  });

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [selectedPermissionId, setSelectedPermissionId] = useState<
    string | null
  >(null);
  const [selectedPermissionname, setSelectedPermissionname] = useState<
    string | null
  >(null);
  const handleOpenModalCreate = () => {
    setOpenModalCreate(true);
  };

  const handleCloseModalCreate = () => {
    setOpenModalCreate(false);
  };
  const handleOpenModalUpdate = (id: string, name: string) => {
    setSelectedPermissionId(id);
    setSelectedPermissionname(name);
    setOpenModalUpdate(true);
  };

  const handleCloseModalUpdate = () => {
    setOpenModalUpdate(false);
  };

  return (
    <>
      {!checkStatusBackground ? (
        <></>
      ) : (
        <>
          <div
            style={{
              padding: "0 16px",
              marginBottom: "10px",
            }}
          >
            <Row style={{ width: "100%" }}>
              <Col span={12} xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <div
                  style={{
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    padding: "16px 16px",
                  }}
                >
                  <Flex justify="end" align="end" wrap gap="small">
                    <Button
                      type="primary"
                      size="large"
                      onClick={handleOpenModalCreate}
                    >
                      Create New
                    </Button>
                  </Flex>
                </div>
              </Col>
            </Row>
          </div>
          <ContentComponent>
            <Table
              columns={columns}
              dataSource={listItem}
              scroll={{ x: 768, y: 375 }}
            />
          </ContentComponent>
        </>
      )}
      <CreatePermissionModal
        open={openModalCreate}
        onClose={handleCloseModalCreate}
      />
      <UpdatePermissionModal
        permissionId={selectedPermissionId ? `${selectedPermissionId}` : ""}
        permissionName={
          selectedPermissionname ? `${selectedPermissionname}` : ""
        }
        open={openModalUpdate}
        onClose={handleCloseModalUpdate}
      />
    </>
  );
};

export default PermissionPage;
