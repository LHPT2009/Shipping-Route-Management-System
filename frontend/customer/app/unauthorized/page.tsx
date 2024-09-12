import Paragraph from "antd/es/typography/Paragraph";
import Unauthorized from "@/public/images/unauthorized/unauthorized.png";
import { Flex } from "antd";

const UnauthorizedPage = () => {
  return (
    <Flex align="center" justify="center" vertical style={{margin: "6rem auto", textAlign: "center"}}>
      <img src={Unauthorized.src} style={{width: "20rem"}}/>
      <Paragraph>
        You do not have permission to access this page
      </Paragraph>
    </Flex>
  );
};

export default UnauthorizedPage;
