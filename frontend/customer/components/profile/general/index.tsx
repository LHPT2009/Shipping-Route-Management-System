'use client';

import React from "react";
import { ChildrenComponentProps } from "@/types/children";
import { Button, Flex } from "antd";
import styles from "./profile.module.css";
import Tung from "../../../public/images/homepage/tung_2.jpg";
import Title from "antd/es/typography/Title";
import { COLOR } from "@/constant/color";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { UserState } from "@/lib/store/user";
import Paragraph from "antd/es/typography/Paragraph";

const GeneralInformationComponent: React.FC<ChildrenComponentProps> = ({ children }) => {

  const user: UserState = useAppSelector((state) => state.user);

  return (
    <Flex vertical align="center" justify="center" style={{ width: "45rem", margin: "6rem auto 2rem auto" }}>

      <Title level={4} style={{
        fontSize: "2rem",
        fontWeight: 700,
        color: COLOR.TEXT,
      }}>
        My profile
      </Title>
      <div className={styles['common-container']}>
        <img className={styles["avatar"]} src={Tung.src} alt="tung" />
        <Flex justify="space-between" align="flex-start" style={{ width: "100%", margin: 0 }}>
          <Flex gap="0.3rem" vertical align="flex-start" style={{ marginLeft: "1.5rem" }}>
            <Title
              level={5}
              style={{ color: COLOR.TEXT, margin: 0 }}
            >
              {user.username}
            </Title>
            <Paragraph
              style={{
                fontSize: "0.9rem",
                color: "#8f959b",
                fontWeight: "600",
                margin: 0
              }}
            >
              {user.role}
            </Paragraph>
            <Paragraph
              style={{
                fontSize: "0.9rem",
                margin: 0
              }}
            >
              {user.email}
            </Paragraph>
            <Button
              type="text"
              style={{
                fontSize: "0.9rem",
                height: "min-content",
                margin: 0,
                padding: 0,
                color: "#4f46e5",
                background: "none",
                fontWeight: "500",
              }}
            >
              Change password
            </Button>
          </Flex>
        </Flex>
      </div>

      <div className={styles['common-container']}>
        <img className={styles["avatar"]} src={Tung.src} alt="tung" />
        <Flex justify="space-between" align="flex-start" style={{ width: "100%", margin: 0 }}>
          <Flex gap="0.3rem" vertical align="flex-start" style={{ marginLeft: "1.5rem" }}>
            <Title
              level={5}
              style={{ color: COLOR.TEXT, margin: 0 }}
            >
              {user.username}
            </Title>
            <Paragraph
              style={{
                fontSize: "0.9rem",
                color: "#8f959b",
                fontWeight: "600",
                margin: 0
              }}
            >
              {user.role}
            </Paragraph>
            <Paragraph
              style={{
                fontSize: "0.9rem",
                margin: 0
              }}
            >
              {user.email}
            </Paragraph>
            <Button
              type="text"
              style={{
                fontSize: "0.9rem",
                height: "min-content",
                margin: 0,
                padding: 0,
                color: "#4f46e5",
                background: "none",
                fontWeight: "500",
              }}
            >
              Change password
            </Button>
          </Flex>
        </Flex>
      </div>
      
    </Flex>

  );
};

export default GeneralInformationComponent;
