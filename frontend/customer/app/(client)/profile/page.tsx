'use client';

import React from "react";
import { Flex, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { COLOR } from "@/constant/color";;
import GeneralInformationComponent from "@/components/profile/account";
import PersonalInformationComponent from "@/components/profile/personal";
import withProtectedRoute from "@/components/auth/protection";

const ProfilePage = () => {
  return (
    <Flex vertical align="center" justify="center" style={{ width: "45rem", margin: "6.5rem auto 2rem auto" }}>
      <Title level={4} style={{
        fontSize: "2rem",
        fontWeight: 700,
        color: COLOR.TEXT,
      }}>
        My profile
      </Title>
      <GeneralInformationComponent />
      <PersonalInformationComponent />
    </Flex>
  );
};

export default withProtectedRoute(ProfilePage);
