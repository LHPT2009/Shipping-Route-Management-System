"use client";

import LayoutComponent from "@/components/layout/client";
import BodyComponent from "@/components/body";
import HompageComponent from "@/components/homepage";
import { useAppDispatch } from "@/lib/hooks/hooks";
import { useEffect } from "react";
import { menuActions, MenuState } from "@/lib/store/menu";
import { KEYMENU } from "@/constant";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const value : MenuState ={
      keyMenu: KEYMENU.HOME,
    }
    dispatch(menuActions.changeInfoMenu(value))
  }, [dispatch]);
  
  return (
    <LayoutComponent>
      <BodyComponent>
        <HompageComponent />
      </BodyComponent>
    </LayoutComponent>
  );
}
