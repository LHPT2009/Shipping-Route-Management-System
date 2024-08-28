import React from "react";
import { Menu } from "antd";
import { MenuComponentProps } from "@/types/menu";
import { MENULIST } from "@/constant";
import { useRouter } from "next/navigation";

const MenuComponent: React.FC<MenuComponentProps> = ({
  defaultSelectedKeys,
  responsive,
}) => {
  const router = useRouter();
  const handleClick = (e: { key: string }) => {
    const clickedItem = MENULIST.find((item) => item.key === e.key);
    if (clickedItem) {
      router.push(clickedItem.url!);
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
            flex: "auto",
            height: "3.7rem",
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
