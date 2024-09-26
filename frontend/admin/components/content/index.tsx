import React from "react";
import { Layout, theme } from "antd";
import { ChildrenComponentProps } from "@/types/children";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";

const { Content } = Layout;

const ContentComponent: React.FC<ChildrenComponentProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const screenWidth = UseScreenWidth();

  const extraSmall = true;
  const small = true;
  const medium = false;
  const large = false;
  const extraLarge = false;
  const extraExtraLarge = false;

  const responsive = GetValueFromScreen(
    screenWidth,
    extraSmall,
    small,
    medium,
    large,
    extraLarge,
    extraExtraLarge
  );
  return (

    <Content
      style={{
        marginInlineStart: responsive ? 0 : 215,
        marginRight: "20px",
        marginLeft: responsive ? 20 : 215,
      }}
    >
      <div
        style={{
          padding: 24,
          background: colorBgContainer,
          borderRadius: "0.5rem"
        }}
      >
        {children}
      </div>
    </Content>

  );
};

export default ContentComponent;
