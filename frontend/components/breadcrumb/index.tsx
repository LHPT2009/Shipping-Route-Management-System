import { Breadcrumb } from "antd";
import React from "react";
import { BreadcrumbComponentProps } from "../../types/breadcrumb";

const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({ items }) => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {items.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.link ? <a href={item.link}>{item.name}</a> : item.name}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
