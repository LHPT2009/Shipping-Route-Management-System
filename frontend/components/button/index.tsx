import { ButtonComponentProps } from "@/types/button";
import { Button } from "antd";
import React from "react";

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  text,
  type = "default",
  onClick,
  disabled = false,
  loading = false,
}) => {
  return (
    <Button type={type} onClick={onClick} disabled={disabled} loading={loading}>
      {text}
    </Button>
  );
};

export default ButtonComponent;
