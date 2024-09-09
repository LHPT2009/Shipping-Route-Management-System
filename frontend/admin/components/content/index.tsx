import React from "react";
import { Layout, theme } from "antd";
import { ChildrenComponentProps } from "@/types/children";

const { Content } = Layout;

const ContentComponent: React.FC<ChildrenComponentProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (

    <Content>
      <div
        style={{
          padding: 24,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </div>
    </Content>

  );
};

export default ContentComponent;
