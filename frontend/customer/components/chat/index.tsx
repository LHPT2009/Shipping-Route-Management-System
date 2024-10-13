import React from "react";
import styles from "./chat.module.css";
import { AudioOutlined, CloseOutlined, OpenAIFilled, SearchOutlined, SendOutlined } from "@ant-design/icons";
import { Flex, Form, Input, Button } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import LogoImage from "@/public/logo/srouting_white.png";
import LogoDefault from "@/public/logo/logoImage.png";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { COLOR } from "@/constant";

const ChatComponent: React.FC = () => {

  // Validate Yup
  const schema = yup
    .object({
      chat: yup.string()
    })
    .required();

  //useFrom hook
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm({ resolver: yupResolver(schema) });

  const onFinish = async (values: any) => {
    console.log(values);
  };

  return (
    <Flex
      vertical
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '5.5rem',
        height: '30rem',
        width: '22rem',
        background: 'white',
        borderRadius: '0.7rem',
        boxShadow: '0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}>
      <div className={styles['header']}>
        <Flex gap="0.6rem" align="center" style={{ height: "100%" }}>
          <img src={LogoImage.src} style={{ width: "1.8rem" }} />
          <Flex justify="space-between" align="flex-start" style={{ width: "100%" }}>
            <div>
              <Paragraph style={{ color: "white", fontWeight: 500, margin: 0 }}>S-Routing Customer Service</Paragraph>
              <Paragraph style={{ color: "#e9ecef", fontSize: "0.9rem", margin: 0 }}>Chat with us</Paragraph>
            </div>
            <CloseOutlined style={{ fontSize: "1.3rem", marginTop: "0.5rem", color: "white" }} />
          </Flex>
        </Flex>
      </div>
      <div className={styles['content']}>
        <Paragraph style={{ maxWidth: "70%", alignSelf: "flex-end", background: COLOR.PRIMARY, color: "white", borderRadius: "0.4rem", margin: "0.5rem 0", padding: "0.4rem 0.8rem" }}>S123123</Paragraph>
        <Paragraph style={{ maxWidth: "70%", alignSelf: "flex-end", background: COLOR.PRIMARY, color: "white", borderRadius: "0.4rem", margin: "0.5rem 0", padding: "0.4rem 0.8rem" }}>Tran Dam Gia Huy HUY HUY HUY HUY HUYYYYYYYYYYYYYYYYYYYYYYYY</Paragraph>

        <Flex gap="0.5rem" align="flex-end">
          <img src={LogoDefault.src} style={{ width: "1.7rem", height: "1.7rem", borderRadius: "50%", marginBottom: "0.5rem" }} />
          <Paragraph style={{ maxWidth: "70%", background: "#e9ecef", borderRadius: "0.4rem", margin: "0.5rem 0", padding: "0.4rem 0.8rem" }}>HEllo from gPTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT</Paragraph>
        </Flex>
        <Paragraph style={{ maxWidth: "70%", alignSelf: "flex-end", background: COLOR.PRIMARY, color: "white", borderRadius: "0.4rem", margin: "0.5rem 0", padding: "0.4rem 0.8rem" }}>Test width</Paragraph>
        <Flex gap="0.5rem" align="flex-end">
          <img src={LogoDefault.src} style={{ width: "1.7rem", height: "1.7rem", borderRadius: "50%", marginBottom: "0.5rem" }} />
          <Paragraph style={{ maxWidth: "70%", background: "#e9ecef", borderRadius: "0.4rem", margin: "0.5rem 0", padding: "0.4rem 0.8rem" }}>Test abc</Paragraph>
        </Flex>
        <Flex gap="0.5rem" align="flex-end">
          <img src={LogoDefault.src} style={{ width: "1.7rem", height: "1.7rem", borderRadius: "50%", marginBottom: "0.5rem" }} />
          <Paragraph style={{ maxWidth: "70%", background: "#e9ecef", borderRadius: "0.4rem", margin: "0.5rem 0", padding: "0.4rem 0.8rem" }}>ABCZYXZZZZZZZZZZZZZZZZZZ jkaslkdowa dwadw</Paragraph>
        </Flex>
      </div>
      <Flex align="center" style={{ padding: "0.5rem 1rem", height: "5rem" }} >
        <Form
          initialValues={{ remember: true }}
          style={{
            width: "100%",
            textAlign: "left",
            marginBottom: "0",
            display: "flex",
            height: "2.5rem",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
          onFinish={handleSubmit(onFinish)}
        >
          <Form.Item
            name="chat"
            style={{ width: "88%" }}
          >
            <Controller
              name="chat"
              control={control}
              render={({ field }) => (
                <Input
                  key="chat"
                  {...field}
                  placeholder="Type a message"
                  suffix={<AudioOutlined style={{ color: COLOR.PRIMARY, fontSize: "1rem", cursor: "pointer" }} />}
                  style={{ borderRadius: "0.4rem", height: "2.5rem", background: "white", margin: 0 }}
                />
              )}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="link" style={{ padding: 0, marginTop: "0.25rem" }}>
              <SendOutlined style={{ color: COLOR.PRIMARY, fontSize: "1.25rem", cursor: "pointer" }} />
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Flex>

  );
};

export default ChatComponent;
