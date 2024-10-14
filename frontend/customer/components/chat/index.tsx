'use client';

import React, { useEffect, useRef } from "react";
import styles from "./chat.module.css";
import { AudioOutlined, CloseOutlined, SendOutlined } from "@ant-design/icons";
import { Flex, Form, Input, Button } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import LogoDefault from "@/public/logo/logoImage.png";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { COLOR } from "@/constant";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { chatActions } from "@/lib/store/chat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatComponent: React.FC = () => {

  const dispatch = useAppDispatch();

  const chatMessage: {
    message: string;
    isAi: boolean;
  }[] = useAppSelector((state) => state.chat.chatMessage);

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

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessage]);

  const onFinish = async (values: any) => {
    dispatch(chatActions.addMessage({ message: values.chat, isAi: false }));

    const aiMessage: string = "Hello from gPT";
    dispatch(chatActions.addMessage({ message: aiMessage, isAi: true }));
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
        boxShadow: '0 0 0.7rem 0.7rem rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
      }}>
      <div className={styles['header']}>
        <Flex gap="0.6rem" align="center" style={{ height: "100%" }}>
          <img src={LogoDefault.src} style={{ width: "1.8rem" }} />
          <Flex justify="space-between" align="flex-start" style={{ width: "100%" }}>
            <div>
              <Paragraph style={{ fontWeight: 500, margin: 0 }}>S-Routing Customer Service</Paragraph>
              <Paragraph style={{ color: "#495057", fontSize: "0.9rem", margin: 0 }}>Chat with us</Paragraph>
            </div>
            <CloseOutlined
              onClick={() => dispatch(chatActions.closeChat())}
              style={{ fontSize: "1.3rem", marginTop: "0.5rem", color: COLOR.PRIMARY, cursor: "pointer" }}
            />
          </Flex>
        </Flex>
      </div>
      <div className={styles['content']}>
        {chatMessage.map((item, index) => {
          return (
            item.isAi ?
              <Flex gap="0.5rem" align="flex-end" style={{margin: "0.5rem 0"}}>
                <img src={LogoDefault.src} style={{ width: "1.8rem", height: "1.8rem", borderRadius: "50%" }} />
                <Paragraph style={{ maxWidth: "70%", background: "#e9ecef", borderRadius: "0.5rem", margin: "0", padding: "0.5rem 0.8rem" }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles['reactMarkDown']}>
                    {item.message}
                  </ReactMarkdown>
                </Paragraph>
              </Flex>
              : <Paragraph style={{ maxWidth: "70%", alignSelf: "flex-end", background: COLOR.PRIMARY, color: "white", borderRadius: "0.5rem", margin: "0.5rem 0", padding: "0.4rem 0.8rem" }}>
                {item.message}
              </Paragraph>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <Flex align="flex-start" style={{ padding: "0.5rem 1rem", height: "4rem" }} >
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
                  style={{ borderRadius: "0.6rem", height: "2.5rem", background: "white", margin: 0 }}
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
