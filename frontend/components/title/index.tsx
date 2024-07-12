"use client";
import React from "react";
import { TitleComponentProps } from "@/types/title";

const TitleComponent: React.FC<TitleComponentProps> = ({ title }) => {
  return <>{title}</>;
};

export default TitleComponent;
