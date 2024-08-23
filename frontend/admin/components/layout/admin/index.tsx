"use client";
import React from 'react';

import { Layout, theme } from 'antd';
import { ChildrenComponentProps } from "@/types/children";
import FooterComponent from '@/components/footer';
import SiderComponent from '@/components/side';
import ContentComponent from '@/components/content';
import { ContentComponentProps } from '@/types/content';

const { Header } = Layout;


const LayoutAdminComponent: React.FC<ContentComponentProps> = ({ children, listbread }: ContentComponentProps) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <SiderComponent />
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <ContentComponent listbread={listbread} >{children}</ContentComponent>
                <FooterComponent />
            </Layout>
        </Layout>
    );
};

export default LayoutAdminComponent;
