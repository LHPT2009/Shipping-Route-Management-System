import { ChildrenComponentProps } from "@/types/children";
import React from "react";
import styles from "./index.module.css";

const AnimationLeftComponent: React.FC<ChildrenComponentProps> = ({ children }) => {
  return (
    <div className={styles["fade-in-left"]}>
      {children}
    </div>
  );
};

export default AnimationLeftComponent;
