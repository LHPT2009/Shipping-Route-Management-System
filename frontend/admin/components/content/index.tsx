import React from "react";
import { Layout, theme } from 'antd';
import BreadcrumbComponent from "../breadcrumb";
import { ContentComponentProps } from "@/types/content";

const { Content } = Layout;

const ContentComponent: React.FC<ContentComponentProps> = ({ children, listbread }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (<>
    <BreadcrumbComponent items={listbread} />
    <Content style={{ margin: '0 16px' }}>
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        {children}
      </div>
    </Content>
  </>
  );
};

export default ContentComponent;
