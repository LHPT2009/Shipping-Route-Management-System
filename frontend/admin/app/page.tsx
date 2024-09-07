"use client";

import ContentComponent from "@/components/content";
import HeaderComponent from "@/components/header";
import LayoutAdminComponent from "@/components/layout/admin";
import { KEYMENU, LABELMENU } from "@/constant";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { menuActions, MenuState } from "@/lib/store/menu";

export default function Home() {
  const dispatch = useAppDispatch();
  const value : MenuState ={
    keyMenu: KEYMENU.DASHBOARD,
    labelMenu: LABELMENU.DASHBOARD
  }
  dispatch(menuActions.changeInfoMenu(value))
  return (
    <LayoutAdminComponent>
      <HeaderComponent />
      <ContentComponent>asdasd</ContentComponent>
    </LayoutAdminComponent>
  );
}
