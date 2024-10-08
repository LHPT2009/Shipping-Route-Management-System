import { ChildrenComponentProps } from "@/types/children";
import React from "react";
import styles from "./index.module.css";

const AnimationRightComponent: React.FC<ChildrenComponentProps> = ({ children }) => {
  return (
    <div className={styles["fade-in-right"]}>
      {children}
    </div>
  );
};

export default AnimationRightComponent;
