import React from "react";
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";

const FloatComponent: React.FC = () => {
  return (
    <>
      {" "}
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 100 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
    </>
  );
};

export default FloatComponent;
