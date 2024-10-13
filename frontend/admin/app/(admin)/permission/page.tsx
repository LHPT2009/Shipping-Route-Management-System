"use client";
import React, { useEffect } from "react";
import ContentComponent from "@/components/content";
import { theme, Table, Breadcrumb, Button } from "antd";
import type { TableColumnsType } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import usePermissions from "@/lib/hooks/permission/usePermissions";
import { menuActions, MenuState } from "@/lib/store/menu";
import { KEYMENU, LABELMENU } from "@/constant";
import styles from "./permission.module.css";
import Link from "next/link";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";
import { Content } from "antd/es/layout/layout";
import { ExportOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx';

interface DataType {
  id: string;
  name: string;
}

const PermissionPage = () => {
  const { permissions, loading } = usePermissions();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const value: MenuState = {
      keyMenu: KEYMENU.PERMISSION,
      labelMenu: LABELMENU.PERMISSION,
    };
    dispatch(menuActions.changeInfoMenu(value));
  }, [dispatch]);

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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const checkStatusBackground: boolean = useAppSelector(
    (state) => state.responsive.checkStatusBackground
  );

  const screenWidth = UseScreenWidth();

  const responsive = GetValueFromScreen(screenWidth, true, true, false, false, false, false);

  const exportToExcel = (data: DataType[], fileName: string) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    const headers = data.length > 0 ? Object.keys(data[0]) : [];
    const maxWidths = data.reduce((widths: number[], row: any) => {
      headers.forEach((header, index) => {
        widths[index] = Math.max(widths[index] || 0, header.length);
      });
      Object.keys(row).forEach((key: string, index: number) => {
        const value = row[key as keyof DataType] ? row[key as keyof DataType].toString() : '';
        widths[index] = Math.max(widths[index] || 10, value.length + 4);
      });
      return widths;
    }, []);

    // Set column widths
    worksheet['!cols'] = maxWidths.map((width: any) => ({ wch: width }));
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Permissions');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
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
                  { title: <Link href="/">Dashboard</Link> },
                  { title: "List permissions" },
                ]}
                style={{
                  paddingLeft: "0.5rem",
                  marginBottom: "1rem"
                }}
              />
            </Content>

            <ContentComponent>
              <Button
                type="primary"
                onClick={() => exportToExcel(permissions, 'permissions')}
                style={{ color: "white", borderRadius: "0.4rem", height: "2.8rem", marginBottom: "1.5rem" }}
              >
                <ExportOutlined />
                Export to Excel
              </Button>
              <Table
                columns={columns}
                dataSource={permissions}
                className={styles["table-striped-rows"]}
                loading={loading}
              />
            </ContentComponent>
          </div>
        </>
      )}
    </>
  );
};

export default PermissionPage;
