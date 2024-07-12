export interface BreadcrumbItem {
  name: string;
  link?: string;
}

export interface BreadcrumbComponentProps {
  items: BreadcrumbItem[];
}
