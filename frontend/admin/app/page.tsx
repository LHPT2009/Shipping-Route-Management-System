"use client";

import React, { useState, useEffect } from "react";
import ContentComponent from "@/components/content";
import HeaderComponent from "@/components/header";
import LayoutAdminComponent from "@/components/layout/admin";
import LoadingComponent from "@/components/loading";
import withProtectedRoute from "@/components/protection/withProtectedRoute";
import withRoleCheck from "@/components/protection/withRoleCheck";
import { COLOR, KEYMENU, LABELMENU } from "@/constant";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { menuActions, MenuState } from "@/lib/store/menu";
import useLoading from "@/lib/hooks/useLoading";
import { ROLE } from "@/constant/role";
import { AdminPermissions, AdminRoles } from "@/lib/permissions/admin";
import LineGraph from "@/components/chart";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";

function Home() {
  const dispatch = useAppDispatch();
  const value: MenuState = {
    keyMenu: KEYMENU.DASHBOARD,
    labelMenu: LABELMENU.DASHBOARD
  }

  dispatch(menuActions.changeInfoMenu(value))

  const getLoadingStatus = useAppSelector((state) => state.loading.loadingStatus);
  const showLoading = useLoading(getLoadingStatus);

  if (showLoading) {
    return <LoadingComponent />;
  }

  return (
    <LayoutAdminComponent>
      <HeaderComponent />
      <div style={{ margin: "6.5rem 1rem 0 13.58rem ", borderRadius: "0.5rem", height: "50rem" }}>
        <Flex justify="space-between" align="center" style={{ marginBottom: "1rem", height: "50rem" }} gap="2rem">
          <Flex vertical style={{ width: "72%", height: "50rem" }} gap="2rem">

            {/* Line graph */}
            <div style={{ height: "33rem", background: "white", borderRadius: "0.5rem", padding: "1.5rem 2rem" }}>
              <Title level={4} style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#495057",
              }}>
                The most popular destination
              </Title>

              <Title level={4} style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: COLOR.PRIMARY,
                marginBottom: "2.5rem",
                marginTop: "1rem",
              }}>
                Starlight bridge - 5 times
              </Title>
              <div style={{ height: "22rem" }}><LineGraph /></div>

            </div>

            {/* Top users */}
            <div style={{ height: "15rem", background: "white", borderRadius: "0.5rem" }}></div>
          </Flex>

          {/* Statistics */}
          <div style={{ height: "50rem", width: "25%", background: "white", borderRadius: "0.5rem" }}></div>
        </Flex>
      </div>
    </LayoutAdminComponent>
  );
}

export default withProtectedRoute(withRoleCheck(Home, AdminRoles, AdminPermissions));
