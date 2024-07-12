import React from "react";
import { ChildrenComponentProps } from "../../types/children";
import { COLOR } from "@/constant";

const bodyComponent: React.FC<ChildrenComponentProps> = ({ children }) => {
  return (
    <div
      style={{
        padding: 24,
        height: "79vh",
        overflow: "hidden",
        background: COLOR.BACKGROUNDBODY,
        borderRadius: "8px",
      }}
    >
      {children}
    </div>
  );
};

export default bodyComponent;
