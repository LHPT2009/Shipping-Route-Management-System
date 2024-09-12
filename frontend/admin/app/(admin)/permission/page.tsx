"use client";
import React, { useEffect } from "react";
import ContentComponent from "@/components/content";
import { theme, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import usePermissions from "@/lib/hooks/permission/usePermissions";
import { menuActions, MenuState } from "@/lib/store/menu";
import { KEYMENU, LABELMENU } from "@/constant";
import styles from "./permission.module.css";

interface DataType {
  id: string;
  name: string;
}

const PermissionPage = () => {

  const { permissions,loading } = usePermissions();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const value : MenuState ={
      keyMenu: KEYMENU.PERMISSION,
      labelMenu: LABELMENU.PERMISSION
    }
    dispatch(menuActions.changeInfoMenu(value))
  }, [dispatch]);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    }
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
            <Table
              columns={columns}
              dataSource={permissions}
              className={styles['table-striped-rows']}
              loading={loading}
            />
          </ContentComponent>
        </>
      )}
    </>
  );
};

export default PermissionPage;
