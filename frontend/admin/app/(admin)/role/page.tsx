"use client";
import React, { useEffect, useState } from "react";
import ContentComponent from "@/components/content";
import { Flex, Button, Table, Breadcrumb, Tooltip, Upload } from "antd";
import type { TableColumnsType, UploadFile } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import CreateRoleModal from "@/components/modal/role/create";
import UpdateRoleModal from "@/components/modal/role/update";
import AssginPermissionToRoleModal from "@/components/modal/role/assign";
import getAllRoleExceptOrther from "@/lib/hooks/role/getAllRoleExceptOrther";
import { menuActions, MenuState } from "@/lib/store/menu";
import { COLOR, KEYMENU, LABELMENU } from "@/constant";
import styles from "./role.module.css";
import { DownloadOutlined, ExportOutlined, PlusOutlined, RetweetOutlined, UploadOutlined } from "@ant-design/icons";
import Link from "next/link";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import { Content } from "antd/es/layout/layout";
import * as XLSX from 'xlsx';
import useAntNotification from "@/lib/hooks/notification";
import { NOTIFICATION } from "@/constant/notification";
import { ApolloError, useMutation } from "@apollo/client";
import { CREATE_MUTIPLE_ROLES } from "@/apollo/mutations/role";
import { useHandleError } from "@/lib/hooks/error";

interface DataType {
  id: string;
  name: string;
}

const RolePage = () => {
  const { roles, loading, refetch } = getAllRoleExceptOrther([]);
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

  const columns: TableColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
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
          {
            record.name !== 'ADMIN' ? (<>
              <Button
                type="primary"
                onClick={() => handleOpenModalAssignPermissionToRole(record.id)}
                style={{ padding: "1.1rem 1.2rem", borderRadius: "0.3rem" }}
              >
                <RetweetOutlined style={{ fontSize: "1.1rem" }} />
                Assign permission
              </Button>
            </>) : (<>
              <Tooltip placement="bottom" title="Assign to admin is disabled">
                <Button
                  type="primary"
                  onClick={() => handleOpenModalAssignPermissionToRole(record.id)}
                  style={{ padding: "1.1rem 1.2rem", borderRadius: "0.3rem" }}
                  disabled
                >
                  <RetweetOutlined style={{ fontSize: "1.1rem" }} />
                  Assign permission
                </Button>
              </Tooltip>
            </>)
          }
        </Flex>
      ),
    },
  ];

  const checkStatusBackground: boolean = useAppSelector(
    (state) => state.responsive.checkStatusBackground
  );

  const screenWidth = UseScreenWidth();

  const responsive = GetValueFromScreen(screenWidth, true, true, false, false, false, false);
  const { handleError } = useHandleError();

  const [createMutipleRoles] = useMutation(CREATE_MUTIPLE_ROLES, {
    onCompleted: async (data) => {
      refetch();
      openNotificationWithIcon('success', NOTIFICATION.CONGRATS, "Roles were imported successfully");
    },
    onError: async (error: ApolloError) => {
      await handleError(error);
    }
  });

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: DataType[] = XLSX.utils.sheet_to_json(worksheet);
      const isValidFormat = jsonData.length !== 0 && jsonData.every(data => {
        const keys = Object.keys(data);
        return keys.length === 1 && keys[0] === 'name';
      });
      if (!isValidFormat) {
        openNotificationWithIcon('error', NOTIFICATION.ERROR, "Invalid format of file. Please follow the template file to import roles!");
        return;
      } else {
        createMutipleRoles({
          variables: {
            input: {
              names: jsonData.map((item) => item.name),
            },
          },
        })
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const { openNotificationWithIcon } = useAntNotification();

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.name.endsWith('.xlsx');
      if (!isExcel) {
        openNotificationWithIcon('error', NOTIFICATION.ERROR, "You can only upload Excel files!");
        return Upload.LIST_IGNORE; // Prevent the file from being added to the upload list
      } else {
        handleFileUpload(file);
      }
      return false; // Prevent automatic upload
    },
    maxCount: 1,
  };

  const exportToExcel = (data: DataType[] | { name: string }[], fileName: string) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    const maxWidths = data.reduce((widths: number[], row: any) => {
      headers.forEach((header, index) => {
        widths[index] = Math.max(widths[index] || 0, header.length + 2);
      });
      Object.keys(row).forEach((key: string, index: number) => {
        const value = row[key as keyof DataType] ? row[key as keyof DataType].toString() : '';
        widths[index] = Math.max(widths[index] || 10, value.length + 3);
      });
      return widths;
    }, []);

    // Set column widths
    worksheet['!cols'] = maxWidths.map((width: any) => ({ wch: width }));

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Roles');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const downloadTemplate = () => {
    const templateData: { name: string }[] = [{ name: '' }]; // Template with one column "name"
    exportToExcel(templateData, 'template');
  };

  return (
    <>
      {!checkStatusBackground ? (
        <></>
      ) : (
        <>
          <div>
            <Content style={{ marginInlineStart: responsive ? 20 : 215, marginTop: responsive ? "190px" : "70px" }}>
              <Breadcrumb
                items={[
                  { title: <Link href="/">Dashboard</Link>, },
                  { title: 'List roles', }
                ]}
                style={{ paddingLeft: "0.5rem", marginBottom: "1rem" }}
              />
            </Content>
            <ContentComponent>
              <Flex justify="space-between" style={{ marginBottom: "1.5rem" }}>
                <Button
                  type="default"
                  onClick={handleOpenModalCreate}
                  style={{ color: COLOR.PRIMARY, border: "1px solid #4f46e5", padding: "0 1.2rem", height: "2.8rem", borderRadius: "0.4rem" }}
                >
                  <PlusOutlined />
                  New role
                </Button>
                <Flex gap="1rem">
                  <Button
                    type="default"
                    onClick={downloadTemplate}
                    style={{ color: COLOR.PRIMARY, border: "1px solid #4f46e5", padding: "0 1.2rem", height: "2.8rem", borderRadius: "0.4rem" }}
                  >
                    <DownloadOutlined style={{ fontSize: "1.2rem" }} />
                    Download template
                  </Button>
                  <Upload {...uploadProps} showUploadList={false}>
                    <Button
                      type="default"
                      style={{ color: COLOR.PRIMARY, border: "1px solid #4f46e5", padding: "0 1.2rem", height: "2.8rem", borderRadius: "0.4rem" }}
                    >
                      <UploadOutlined style={{ fontSize: "1.2rem" }} />
                      Import roles
                    </Button>
                  </Upload>
                  <Button
                    type="primary"
                    onClick={() => exportToExcel(roles, 'roles')}
                    style={{ color: "white", borderRadius: "0.4rem", height: "2.8rem" }}
                  >
                    <ExportOutlined />
                    Export to Excel
                  </Button>
                </Flex>
              </Flex>
              <Table
                columns={columns}
                dataSource={roles}
                className={styles['table-striped-rows']}
                loading={loading}
              />
            </ContentComponent>
          </div>
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
