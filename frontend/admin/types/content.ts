import { ReactNode } from "react";

export interface BreadcrumbItem {
    title: string;
    href?: string;
}

export interface ContentComponentProps {
    children: ReactNode;
    listbread: BreadcrumbItem[];
}