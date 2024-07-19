import React, { useEffect, useState } from "react";
import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import { useRouter } from "next/navigation";
import { getValueFromScreen, useScreenWidth } from "@/utils/screenUtils";

const HeadBodyComponent: React.FC = () => {
  const router = useRouter();

  const handleTabChange = (key: string) => {
    if (key === "1") {
      router.push("/");
    } else if (key === "2") {
      router.push("/client/user");
    }
  };

  const screenWidth = useScreenWidth();

  const extraSmall = true;
  const small = true;
  const medium = false;
  const large = false;
  const extraLarge = false;
  const extraExtraLarge = false;

  const responsive = getValueFromScreen(
    screenWidth,
    extraSmall,
    small,
    medium,
    large,
    extraLarge,
    extraExtraLarge
  );

  return (
    <>
      {!responsive ? (
        <Tabs
          defaultActiveKey="1"
          centered
          style={{ paddingTop: "15px" }}
          onChange={handleTabChange}
          items={[
            AppleOutlined,
            AndroidOutlined,
            AndroidOutlined,
            AndroidOutlined,
            AndroidOutlined,
          ].map((Icon, i) => {
            const id = String(i + 1);
            return {
              key: id,
              label: `Tab ${id}`,
              icon: <Icon />,
            };
          })}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default HeadBodyComponent;
