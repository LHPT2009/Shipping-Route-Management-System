import React from "react";
import { ChildrenComponentProps } from "../../types/children";
import { COLOR } from "@/constant";

const BodyComponent: React.FC<ChildrenComponentProps> = ({ children }) => {
  return (
    <div
      style={{
        background: COLOR.BACKGROUNDBODY,
        borderRadius: "8px",
        marginBottom: "50px",
      }}
    >
      {children}
    </div>
  );
};

export default BodyComponent;
