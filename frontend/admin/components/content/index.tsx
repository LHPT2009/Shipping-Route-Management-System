import React from "react";
import { Layout, theme } from "antd";
import { ChildrenComponentProps } from "@/types/children";

const { Content } = Layout;

const ContentComponent: React.FC<ChildrenComponentProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            height: "760px"
          }}
        >
          {children}
        </div>
      </Content>
    </>
  );
};

export default ContentComponent;
