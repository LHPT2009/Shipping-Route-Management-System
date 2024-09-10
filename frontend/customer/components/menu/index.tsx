import React, { useEffect, useState } from "react";
import { MenuProps, Menu } from "antd";
import { MenuComponentProps } from "@/types/menu";
import { useRouter } from "next/navigation";
import { KEYMENU, LABELMENU } from "@/constant";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { menuActions, MenuState } from "@/lib/store/menu";

type MenuItem = Required<MenuProps>["items"][number];

const MenuComponent: React.FC<MenuComponentProps> = ({
  responsive,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

 const MENULIST: MenuItem[] = [
  {
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

const onClick: MenuProps["onClick"] = (e) => {
  const value : MenuState ={
    keyMenu:e.key,
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
          style={{ height: "100%", borderRight: 0 }}
          mode="inline"
          items={MENULIST}
          onClick={onClick}
          selectedKeys={[selectedKey]}
        />
      )}
    </>
  );
};

export default MenuComponent;
