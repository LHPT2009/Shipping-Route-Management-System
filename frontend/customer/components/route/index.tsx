import React from "react";
import { Layout, theme } from "antd";
import { ChildrenComponentProps } from "@/types/children";

const { Content } = Layout;

const ContentComponent: React.FC<ChildrenComponentProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
      <Content style={{ margin: "0 auto" }}>
        <div
          style={{
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
  );
};

export default ContentComponent;
