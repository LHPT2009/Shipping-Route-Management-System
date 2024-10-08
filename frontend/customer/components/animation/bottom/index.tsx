import { ChildrenComponentProps } from "@/types/children";
import React from "react";
import styles from "./index.module.css";

const AnimationDownComponent: React.FC<ChildrenComponentProps> = ({ children }) => {
  return (
    <div className={styles["fade-in-down"]}>
      {children}
    </div>
  );
};

export default AnimationDownComponent;
