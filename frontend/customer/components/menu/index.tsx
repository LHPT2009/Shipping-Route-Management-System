"use client";

import React, { useEffect, useState } from "react";
import { MenuProps, Menu } from "antd";
import { MenuComponentProps } from "@/types/menu";
import { useRouter } from "next/navigation";
import { KEYMENU, LABELMENU } from "@/constant";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { menuActions, MenuState } from "@/lib/store/menu";
import { RoutePermissions } from "@/lib/permissions/route";
import { PERMISSION } from "@/constant/permission";
import { set } from "react-hook-form";

type MenuItem = Required<MenuProps>["items"][number];

const menuInit = [{
  key: KEYMENU.HOME,
  label: LABELMENU.HOME,
},
{
  key: KEYMENU.ROUTE,
  label: LABELMENU.ROUTE,
},
{
  key: KEYMENU.CONTACT,
  label: LABELMENU.CONTACT,
},
];

const MenuComponent: React.FC<MenuComponentProps> = ({
  responsive,
  open,
  setOpen
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [MENULIST, setMENULIST] = useState<MenuItem[]>(menuInit);

  // const MENULIST: MenuItem[] = [
  //   {
  //     key: KEYMENU.HOME,
  //     label: LABELMENU.HOME,
  //   },
  //   {
  //     key: KEYMENU.ROUTE,
  //     label: LABELMENU.ROUTE,
  //   },
  //   {
  //     key: KEYMENU.CONTACT,
  //     label: LABELMENU.CONTACT,
  //   },
  // ];

  const user = useAppSelector((state) => state.user);
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (isLogin) {
      const nameRole: string = user.role;
      const namePermission: string[] = user.permissions;
      if (![PERMISSION.READ_LIST_ROUTE, PERMISSION.READ_DETAIL_ROUTE].every((permission) => namePermission.includes(permission))) {
        setMENULIST(MENULIST.filter((item: MenuItem) => item!.key !== KEYMENU.ROUTE));
      } else {
        setMENULIST([...menuInit]);
      }
    }
  }, [user.role, user.permissions]);

  const onClickDrawer: MenuProps["onClick"] = (e) => {
    setOpen(false);
    const value: MenuState = {
      keyMenu: e.key,
    }
    dispatch(menuActions.changeInfoMenu(value))
    if (e.key === KEYMENU.HOME) {
      router.push(`/`);
    } else {
      router.push(`/${e.key}`);
    }
  };

  const onClick: MenuProps["onClick"] = (e) => {
    const value: MenuState = {
      keyMenu: e.key,
    }
    dispatch(menuActions.changeInfoMenu(value))
    if (e.key === KEYMENU.HOME) {
      router.push(`/`);
    } else {
      router.push(`/${e.key}`);
    }
  };

  const getKeyMenu: string = useAppSelector((state) => state.menu.keyMenu);

  const [selectedKey, setSelectedKey] = useState<string>(getKeyMenu);

  useEffect(() => {
    setSelectedKey(getKeyMenu);
  }, [getKeyMenu]);

  return (
    <>
      {!responsive ? (
        <Menu
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            flex: "auto",
            height: "3.7rem",
          }}
          mode="horizontal"
          items={MENULIST}
          onClick={onClick}
          selectedKeys={[selectedKey]}
        />
      ) : (
        <Menu
          style={{ height: "20rem", borderRight: 0 }}
          mode="inline"
          items={MENULIST}
          onClick={onClickDrawer}
          selectedKeys={[selectedKey]}
        />
      )}
    </>
  );
};

export default MenuComponent;
