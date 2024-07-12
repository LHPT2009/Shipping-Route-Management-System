"use client";
import React from "react";
import { TextComponentProps } from "@/types/text";

const TextComponent: React.FC<TextComponentProps> = ({ text }) => {
  return <>{text}</>;
};

export default TextComponent;
