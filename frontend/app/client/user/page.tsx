"use client";
import MenuComponent from "@/components/menu";
import BodyComponent from "../../../components/body";
import React from "react";
import { getValueFromScreen, useScreenWidth } from "@/utils/screenUtils";

const userPage = () => {
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
        <>
          <MenuComponent
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            responsive={responsive}
          />
        </>
      ) : (
        <></>
      )}
      <BodyComponent>sss</BodyComponent>
    </>
  );
};

export default userPage;
