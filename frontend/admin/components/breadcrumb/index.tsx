import React from "react";
import { Breadcrumb } from 'antd';
import Link from "next/link";
import { BreadcrumbItem } from "@/types/content";

interface BreadcrumbComponentProps {
    items: BreadcrumbItem[];
}

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ items }) => {
    const breadcrumbItems = items.map(item => ({
        title: item.href ? <Link href={item.href}>{item.title}</Link> : item.title,
    }));

    return (
        <Breadcrumb style={{ margin: '16px 16px' }} items={breadcrumbItems} />
    );
};

export default BreadcrumbComponent;