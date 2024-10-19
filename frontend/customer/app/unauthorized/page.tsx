"use client";

import Paragraph from "antd/es/typography/Paragraph";
import Unauthorized from "@/public/images/unauthorized/unauthorized.png";
import { Button, Flex } from "antd";
import { useRouter } from "next/navigation";
import { GetValueFromScreen, UseScreenWidth } from "@/utils/screenUtils";

const UnauthorizedPage = () => {
  const router = useRouter();
  const screenWidth = UseScreenWidth();
  const responsive = GetValueFromScreen(screenWidth, true, true, true, true);
  return (
    <Flex align="center" justify="center" vertical style={{ margin: "6rem auto", textAlign: "center" }}>
      <img src={Unauthorized.src} style={{ width: "20rem" }} />
      <Paragraph>
        You do not have permission to access this page
      </Paragraph>
      <Button
        onClick={() => router.push("/")}
        type="primary"
        style={responsive ? {
          margin: "2rem",
          padding: "1.5rem",
          border: "none",
        } : {
          margin: "2rem",
          padding: "1.5rem",
          border: "none",
        }
        }
      >
        Go to homepage
      </Button>
    </Flex>
  );
};

export default UnauthorizedPage;
