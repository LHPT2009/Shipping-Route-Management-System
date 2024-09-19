"use client";

import React, { useState, useEffect } from "react";
import ContentComponent from "@/components/content";
import HeaderComponent from "@/components/header";
import LayoutAdminComponent from "@/components/layout/admin";
import LoadingComponent from "@/components/loading";
import withProtectedRoute from "@/components/protection/withProtectedRoute";
import withRoleCheck from "@/components/protection/withRoleCheck";
import { KEYMENU, LABELMENU } from "@/constant";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { menuActions, MenuState } from "@/lib/store/menu";
import useLoading from "@/lib/hooks/useLoading";
import { ROLE } from "@/constant/role";
import { AdminPermissions, AdminRoles } from "@/lib/permissions/admin";

function Home() {
  const dispatch = useAppDispatch();
  const value : MenuState ={
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
      <ContentComponent>Dashboard</ContentComponent>
    </LayoutAdminComponent>
  );
}

export default withProtectedRoute(withRoleCheck(Home, AdminRoles, AdminPermissions));
