"use client";
import React from "react";
import ContentComponent from "@/components/content";
import { theme, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import usePermissions from "@/lib/hooks/permission/usePermissions";
import { menuActions, MenuState } from "@/lib/store/menu";
import { KEYMENU, LABELMENU } from "@/constant";

interface DataType {
  id: string;
  name: string;
}

const PermissionPage = () => {

  const { permissions } = usePermissions();

  const dispatch = useAppDispatch();
  const value : MenuState ={
    keyMenu: KEYMENU.PERMISSION,
    labelMenu: LABELMENU.PERMISSION
  }
  dispatch(menuActions.changeInfoMenu(value))

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
              scroll={{ x: 768, y: 375 }}
            />
          </ContentComponent>
        </>
      )}
    </>
  );
};

export default PermissionPage;
