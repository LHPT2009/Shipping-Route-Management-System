import { ChildrenComponentProps } from "@/types/children";
import React from "react";
import styles from "./index.module.css";

const AnimationUpComponent: React.FC<ChildrenComponentProps> = ({ children }) => {
  return (
    <div className={styles["fade-in-up"]}>
      {children}
    </div>
  );
};

export default AnimationUpComponent;
