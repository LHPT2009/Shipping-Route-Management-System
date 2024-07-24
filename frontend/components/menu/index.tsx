import React from "react";
import { Menu } from "antd";
import { MenuComponentProps } from "@/types/menu";
import { MENULIST } from "@/constant";

const MenuComponent: React.FC<MenuComponentProps> = ({
  defaultSelectedKeys,
  responsive,
}) => {
  const handleClick = (e: { key: string }) => {
    const clickedItem = MENULIST.find((item) => item.key === e.key);
    if (clickedItem) {
      console.log(clickedItem.url);
    }
  };
  return (
    <>
      {!responsive ? (
        <Menu
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
          defaultSelectedKeys={defaultSelectedKeys}
          mode="horizontal"
          items={MENULIST}
          onClick={handleClick}
        />
      ) : (
        <Menu
          style={{ height: "100%", borderRight: 0 }}
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          items={MENULIST}
          onClick={handleClick}
        />
      )}
    </>
  );
};

export default MenuComponent;
