import React from "react";
import { Layout, Row, Col } from "antd";
import logoFull from "@/public/logo/logoFull.png";
import Image from "next/image";

const { Header } = Layout;

const HeaderAuthComponent = () => {
  return (
    <>
      <Row>
        <Header
          style={{
            position: "sticky",
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Image width={200} height={50} src={logoFull} alt="Logo" />
          </Col>
        </Header>
      </Row>
    </>
  );
};

export default HeaderAuthComponent;
