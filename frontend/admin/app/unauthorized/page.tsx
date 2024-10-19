"use client";

import Paragraph from "antd/es/typography/Paragraph";
import Unauthorized from "@/public/images/unauthorized/unauthorized.png";
import { Button, Flex } from "antd";
import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <Flex align="center" justify="center" vertical style={{ margin: "6rem auto", textAlign: "center" }}>
      <img src={Unauthorized.src} style={{ width: "20rem" }} />
      <Paragraph>
        You do not have permission to access this page
      </Paragraph>
      <Button
        onClick={() => router.push("/login")}
        type="primary"
        style={{
          margin: "2rem",
          padding: "1.5rem",
          border: "none",
        }}
      >
        Go to login
      </Button>
    </Flex>
  );
};

export default UnauthorizedPage;
